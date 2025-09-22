import { FC } from "react";
import { Ruler, User, Shirt, Move } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SizeGuide: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <Ruler className="w-4 h-4 mr-2" />
              Size Guide
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Find Your Perfect Fit
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Get the right size the first time with our comprehensive sizing charts
            and measurement guide for all Truth Matters apparel.
          </p>
        </div>
      </section>

      {/* Measurement Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">How to Measure</h2>
            <p className="text-muted-foreground">Follow these steps for accurate measurements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Body Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Chest/Bust</p>
                    <p className="text-sm text-muted-foreground">Measure around the fullest part of your chest, keeping the tape parallel to the ground</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">Waist</p>
                    <p className="text-sm text-muted-foreground">Measure around your natural waistline, about 1-2 inches above your hip bone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Hip</p>
                    <p className="text-sm text-muted-foreground">Measure around the fullest part of your hips, about 7-9 inches below your waistline</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sleeve Length</p>
                    <p className="text-sm text-muted-foreground">From center back neck, over the shoulder, down to wrist with arm slightly bent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-primary" />
                  Garment Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-blue-600">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Length</p>
                    <p className="text-sm text-muted-foreground">From highest point of shoulder to bottom hem</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-blue-600">B</span>
                  </div>
                  <div>
                    <p className="font-semibold">Chest Width</p>
                    <p className="text-sm text-muted-foreground">Across chest from armpit to armpit, laid flat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-blue-600">C</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sleeve Length</p>
                    <p className="text-sm text-muted-foreground">From shoulder seam to end of sleeve</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-bold text-blue-600">D</span>
                  </div>
                  <div>
                    <p className="font-semibold">Shoulder Width</p>
                    <p className="text-sm text-muted-foreground">From shoulder seam to shoulder seam across the back</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Size Charts</h2>
            <p className="text-muted-foreground">All measurements in inches</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="mens" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mens">Men's</TabsTrigger>
                <TabsTrigger value="womens">Women's</TabsTrigger>
                <TabsTrigger value="unisex">Unisex</TabsTrigger>
                <TabsTrigger value="hats">Hats</TabsTrigger>
              </TabsList>

              <TabsContent value="mens" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Men's Apparel Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Chest</TableHead>
                            <TableHead>Waist</TableHead>
                            <TableHead>Hip</TableHead>
                            <TableHead>Sleeve Length</TableHead>
                            <TableHead>Length</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">XS</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>28-30</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>32</TableCell>
                            <TableCell>26.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">S</TableCell>
                            <TableCell>35-37</TableCell>
                            <TableCell>30-32</TableCell>
                            <TableCell>35-37</TableCell>
                            <TableCell>33</TableCell>
                            <TableCell>27.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">M</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>34</TableCell>
                            <TableCell>28.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">L</TableCell>
                            <TableCell>41-43</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>41-43</TableCell>
                            <TableCell>35</TableCell>
                            <TableCell>29.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">XL</TableCell>
                            <TableCell>44-46</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>44-46</TableCell>
                            <TableCell>36</TableCell>
                            <TableCell>30.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2XL</TableCell>
                            <TableCell>47-49</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>47-49</TableCell>
                            <TableCell>37</TableCell>
                            <TableCell>31.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">3XL</TableCell>
                            <TableCell>50-52</TableCell>
                            <TableCell>40-42</TableCell>
                            <TableCell>50-52</TableCell>
                            <TableCell>38</TableCell>
                            <TableCell>32.5</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="womens" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Women's Apparel Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Bust</TableHead>
                            <TableHead>Waist</TableHead>
                            <TableHead>Hip</TableHead>
                            <TableHead>Sleeve Length</TableHead>
                            <TableHead>Length</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">XS</TableCell>
                            <TableCell>30-32</TableCell>
                            <TableCell>24-26</TableCell>
                            <TableCell>33-35</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>24</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">S</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>26-28</TableCell>
                            <TableCell>35-37</TableCell>
                            <TableCell>31</TableCell>
                            <TableCell>25</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">M</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>28-30</TableCell>
                            <TableCell>37-39</TableCell>
                            <TableCell>32</TableCell>
                            <TableCell>26</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">L</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>30-32</TableCell>
                            <TableCell>39-41</TableCell>
                            <TableCell>33</TableCell>
                            <TableCell>27</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">XL</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>41-43</TableCell>
                            <TableCell>34</TableCell>
                            <TableCell>28</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2XL</TableCell>
                            <TableCell>40-42</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>43-45</TableCell>
                            <TableCell>35</TableCell>
                            <TableCell>29</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">3XL</TableCell>
                            <TableCell>42-44</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>45-47</TableCell>
                            <TableCell>36</TableCell>
                            <TableCell>30</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unisex" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Unisex Apparel Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Chest/Bust</TableHead>
                            <TableHead>Waist</TableHead>
                            <TableHead>Hip</TableHead>
                            <TableHead>Length</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">XS</TableCell>
                            <TableCell>31-33</TableCell>
                            <TableCell>26-28</TableCell>
                            <TableCell>33-35</TableCell>
                            <TableCell>25</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">S</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>28-30</TableCell>
                            <TableCell>35-37</TableCell>
                            <TableCell>26</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">M</TableCell>
                            <TableCell>37-39</TableCell>
                            <TableCell>30-32</TableCell>
                            <TableCell>37-39</TableCell>
                            <TableCell>27</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">L</TableCell>
                            <TableCell>40-42</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>39-41</TableCell>
                            <TableCell>28</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">XL</TableCell>
                            <TableCell>43-45</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>41-43</TableCell>
                            <TableCell>29</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2XL</TableCell>
                            <TableCell>46-48</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>43-45</TableCell>
                            <TableCell>30</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">3XL</TableCell>
                            <TableCell>49-51</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>45-47</TableCell>
                            <TableCell>31</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hats" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Hat Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4">How to Measure Hat Size</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Wrap a measuring tape around your head about 1/2 inch above your eyebrows and ears.
                          The tape should sit where your hat would naturally rest.
                        </p>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Size</TableHead>
                                <TableHead>Head Circumference</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">One Size</TableCell>
                                <TableCell>21.5" - 24"</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Adjustable Features</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Snapback closure (6 settings)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Adjustable strap (multiple sizes)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Flexible fit for most head sizes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Fit Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Perfect Fit Tips</h2>
              <p className="text-muted-foreground">Get the best fit for your Truth Matters gear</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Move className="w-5 h-5 text-primary" />
                    Fit Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Relaxed Fit</h4>
                    <p className="text-sm text-muted-foreground">
                      Order your normal size or size up for extra comfort and layering
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fitted Look</h4>
                    <p className="text-sm text-muted-foreground">
                      Order your exact measurements or size down for a more tailored appearance
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Athletic Build</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider sizing up in the chest while maintaining your waist size
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fabric Considerations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Cotton T-Shirts</h4>
                    <p className="text-sm text-muted-foreground">
                      Pre-shrunk but may shrink slightly. Order true to size.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cotton Hoodies</h4>
                    <p className="text-sm text-muted-foreground">
                      Heavyweight cotton blend. Runs true to size with room for layering.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Blended Fabrics</h4>
                    <p className="text-sm text-muted-foreground">
                      Cotton-poly blends have minimal shrinkage and maintain their shape.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Size Recommendations */}
            <div className="mt-8">
              <Alert>
                <Ruler className="h-4 w-4" />
                <AlertDescription>
                  <strong>Between sizes?</strong> We generally recommend sizing up for a more comfortable fit,
                  especially for our heavyweight hoodies. Remember, we offer free exchanges within 30 days
                  if you need a different size!
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Still Not Sure About Your Size?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our customer service team can help you find the perfect fit.
            Free exchanges make it risk-free to try your size!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Free Size Exchanges
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 border-white text-white">
              30-Day Returns
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 border-white text-white">
              Expert Support
            </Badge>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SizeGuide;
