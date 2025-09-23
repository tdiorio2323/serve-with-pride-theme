"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Grid, List, SlidersHorizontal, ChevronDown, Filter } from "lucide-react";
import { cn, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard, CompactProductCard } from "./product-card";
import { Product, ProductFilters, SortOption } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  className?: string;
  showFilters?: boolean;
  showSort?: boolean;
  defaultView?: "grid" | "list";
  defaultSort?: string;
  itemsPerPage?: number;
}

const sortOptions: SortOption[] = [
  { key: "featured", label: "Featured" },
  { key: "best-selling", label: "Best Selling" },
  { key: "price-low-high", label: "Price: Low to High" },
  { key: "price-high-low", label: "Price: High to Low" },
  { key: "newest", label: "Newest First" },
  { key: "a-z", label: "A-Z" },
  { key: "z-a", label: "Z-A" },
];

export function ProductGrid({
  products,
  className,
  showFilters = true,
  showSort = true,
  defaultView = "grid",
  defaultSort = "featured",
  itemsPerPage = 12,
}: ProductGridProps) {
  const [view, setView] = useState<"grid" | "list">(defaultView);
  const [currentSort, setCurrentSort] = useState(defaultSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply filters
    if (filters.availability !== undefined) {
      filtered = filtered.filter(p => p.availableForSale === filters.availability);
    }

    if (filters.price) {
      filtered = filtered.filter(p => {
        const price = p.variants[0].price;
        return (!filters.price!.min || price >= filters.price!.min) &&
               (!filters.price!.max || price <= filters.price!.max);
      });
    }

    if (filters.vendor && filters.vendor.length > 0) {
      filtered = filtered.filter(p => filters.vendor!.includes(p.vendor));
    }

    if (filters.productType && filters.productType.length > 0) {
      filtered = filtered.filter(p => filters.productType!.includes(p.productType));
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }

    // Apply sorting
    switch (currentSort) {
      case "price-low-high":
        filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "best-selling":
      case "featured":
      default:
        // Keep original order for featured/best-selling
        break;
    }

    return filtered;
  }, [products, filters, currentSort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, currentSort]);

  // Get unique values for filters
  const availableVendors = Array.from(new Set(products.map(p => p.vendor))).filter(Boolean);
  const availableTypes = Array.from(new Set(products.map(p => p.productType))).filter(Boolean);
  const availableTags = Array.from(new Set(products.flatMap(p => p.tags))).slice(0, 20); // Limit tags

  const updateFilters = debounce((newFilters: ProductFilters) => {
    setFilters(newFilters);
  }, 300);

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null
  ).length;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        {/* Results count */}
        <div className="text-sm text-muted-foreground font-tactical">
          Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} patriotic products
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Filters Toggle */}
          {showFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="font-tactical"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="patriotRed" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Sort */}
          {showSort && (
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm font-tactical focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          )}

          {/* View Toggle */}
          <div className="hidden sm:flex border border-border rounded-md overflow-hidden">
            <Button
              size="sm"
              variant={view === "grid" ? "default" : "ghost"}
              onClick={() => setView("grid")}
              className="rounded-none font-tactical"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={view === "list" ? "default" : "ghost"}
              onClick={() => setView("list")}
              className="rounded-none font-tactical"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-tactical font-bold text-lg">Filter Products</h3>
            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Availability */}
            <div>
              <label className="block text-sm font-tactical font-semibold mb-2">
                Availability
              </label>
              <select
                value={filters.availability === undefined ? "" : filters.availability.toString()}
                onChange={(e) => updateFilters({
                  ...filters,
                  availability: e.target.value === "" ? undefined : e.target.value === "true"
                })}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Products</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-tactical font-semibold mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.price?.min || ""}
                  onChange={(e) => updateFilters({
                    ...filters,
                    price: { ...filters.price, min: e.target.value ? Number(e.target.value) : undefined }
                  })}
                  className="w-full bg-background border border-border rounded-md px-2 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.price?.max || ""}
                  onChange={(e) => updateFilters({
                    ...filters,
                    price: { ...filters.price, max: e.target.value ? Number(e.target.value) : undefined }
                  })}
                  className="w-full bg-background border border-border rounded-md px-2 py-2 text-sm"
                />
              </div>
            </div>

            {/* Brand/Vendor */}
            <div>
              <label className="block text-sm font-tactical font-semibold mb-2">
                Brand
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableVendors.map((vendor) => (
                  <label key={vendor} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.vendor?.includes(vendor) || false}
                      onChange={(e) => {
                        const currentVendors = filters.vendor || [];
                        const updatedVendors = e.target.checked
                          ? [...currentVendors, vendor]
                          : currentVendors.filter(v => v !== vendor);
                        updateFilters({ ...filters, vendor: updatedVendors });
                      }}
                      className="rounded border-border text-brand-accent focus:ring-brand-accent"
                    />
                    {vendor}
                  </label>
                ))}
              </div>
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-tactical font-semibold mb-2">
                Category
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.productType?.includes(type) || false}
                      onChange={(e) => {
                        const currentTypes = filters.productType || [];
                        const updatedTypes = e.target.checked
                          ? [...currentTypes, type]
                          : currentTypes.filter(t => t !== type);
                        updateFilters({ ...filters, productType: updatedTypes });
                      }}
                      className="rounded border-border text-brand-accent focus:ring-brand-accent"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div>
            <label className="block text-sm font-tactical font-semibold mb-2">
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant={filters.tags?.includes(tag) ? "patriot" : "outline"}
                  onClick={() => {
                    const currentTags = filters.tags || [];
                    const updatedTags = currentTags.includes(tag)
                      ? currentTags.filter(t => t !== tag)
                      : [...currentTags, tag];
                    updateFilters({ ...filters, tags: updatedTags });
                  }}
                  className="text-xs font-tactical"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-tactical font-semibold">Active filters:</span>
          {filters.availability !== undefined && (
            <Badge variant="secondary" className="font-tactical">
              {filters.availability ? "In Stock" : "Out of Stock"}
              <button
                onClick={() => updateFilters({ ...filters, availability: undefined })}
                className="ml-2 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.price && (
            <Badge variant="secondary" className="font-tactical">
              ${filters.price.min || 0} - ${filters.price.max || "∞"}
              <button
                onClick={() => updateFilters({ ...filters, price: undefined })}
                className="ml-2 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.vendor?.map((vendor) => (
            <Badge key={vendor} variant="secondary" className="font-tactical">
              {vendor}
              <button
                onClick={() => updateFilters({
                  ...filters,
                  vendor: filters.vendor!.filter(v => v !== vendor)
                })}
                className="ml-2 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-tactical font-bold text-foreground mb-2">
            No Patriots Found
          </h3>
          <p className="text-muted-foreground font-tactical mb-4">
            No products match your current filters. Try adjusting your search criteria.
          </p>
          <Button variant="patriot" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          )}
        >
          {paginatedProducts.map((product, index) => (
            view === "grid" ? (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 8}
              />
            ) : (
              <CompactProductCard
                key={product.id}
                product={product}
              />
            )
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="font-tactical"
          >
            Previous
          </Button>
          
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            const isVisible = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
            
            if (!isVisible) {
              if (page === 2 || page === totalPages - 1) {
                return <span key={page} className="text-muted-foreground">...</span>;
              }
              return null;
            }
            
            return (
              <Button
                key={page}
                variant={currentPage === page ? "patriot" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="font-tactical w-8"
              >
                {page}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="font-tactical"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}