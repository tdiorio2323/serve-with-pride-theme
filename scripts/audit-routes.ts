import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(__dirname, '../src/pages');

function scanPages(dir: string, prefix = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes = routes.concat(scanPages(path.join(dir, entry.name), prefix + '/' + entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      const route = prefix + '/' + entry.name.replace(/\.tsx$/, '').replace(/Index$/, '');
      routes.push(route === '/Index' ? '/' : route);
    }
  }
  return routes;
}

const routes = scanPages(PAGES_DIR);
console.log('Route Tree:');
routes.forEach(route => console.log(route));
