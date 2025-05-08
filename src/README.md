# Summery of DDD(Domain Driven Design)

<br />

## \*We should add path aliases for root(shared) codes and each feature code

    /tsconfig.json:
        "paths": {
            "@/*": ["./src/*"],
            //* for importing shared code e.g import something from '@/components/Button'
            "@feature#1/*": ["./src/features/feature#1/*"],
            //* for import feature#1 code e.g import something from '@feature#1/components/Comp'
        }

<br />

## \*We should add '/app','/pages','/components','/layouts','/features' folders as contents inside tailwind.config file

    /tailwind.config:
        content: [
            './src/app/**/*.{js,ts,jsx,tsx,mdx}',
            './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
            './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
            './src/components/**/*.{js,ts,jsx,tsx,mdx}',
            './src/features/**/*.{js,ts,jsx,tsx,mdx}'
        ]

## \*We should group client routes like: /src/app/(users) , /src/app/(products)

<br />

## \*We should group api routes like: /src/app/api/users/ , /src/app/api/products/

<br />

### \*We should have this folder structure inside 'src/app' folder

    ```
        /src/app/layout.tsx
        //* shared root layout , should only contains <html><body>,shared providers,... without any <nav>,<aside>,<main>,<footer>
        /src/app/(feature#1)/layout.tsx
        //* feature#1 final layout , should not contain <html>,<body> but should contain feature#1 <nav>,<aside>,<main>,<footer>
        //* import /src/app/layout/index.tsx for having root layout and /src/app/features/feature#1/layout/index.tsx for specific feature layout
        /src/app/(feature#1)/page.tsx
        //* home page of app
        /src/app/loading.tsx
        //* shared loading
        /src/app//not-found.tsx
        //* shared not found
        /src/app/error.tsx
        //* shared error
        /src/app/global-error.tsx
        //* root layout error
        /src/app/(feature#1)/loading.tsx
        //* feature#1 loading
        /src/app/(feature#1)/not-found.tsx
        //* feature#1 not found
        /src/app/(feature#1)/error.tsx
        //* feature#1 error
        /src/app/api/route.tsx
        //* shared route handler
        /src/app/(feature#1)/api/route.tsx
        //* feature#1 route handler
    ```

<br />

### \*Shared code structure should be something like this

    ```
        /src/configs
        /src/data
        /src/components:
            //* we use this folder for common components like Button,Card,TextField,...
            /src/components/index.ts
            //* barrel file
            /src/components/Comp.tsx
            //* component file
            /src/components/<folder-name>/Comp.tsx
            //* for group multiple related components inside 1 folder or put things like index.tsx,Comp.example.tsx,test.tsx,style.module.scss,README.md
        /src/layout:
            /src/layout/Navbar.tsx
            //* specific navbar of root layout
            /src/layout/Footer.tsx
            //* specific footer of root layout
            /src/layout/index.tsx
            //* final root layout which combine all above components
        /src/hooks
        /src/providers
        /src/database
            /src/database/connection-to-db1
            /src/database/connection-to-db2
            //* we put all connections to all dbs inside /src/database because each database can contain multiple features and we should not put specific connection inside features folder
            /src/database/models
            //* shares models
            /src/database/services
            //* shared services
        /src/services
        /src/styles
            //* import files inside this folder in /public/styles/global.scss file
        /src/assets
        /src/utils
        /src/types
    ```

<br />

### \*Each sub-folder in 'features' folder should have this structure

    ```
        /src/features/feature#1/configs
        /src/features/feature#1/data
        /src/features/feature#1/components
            /src/features/feature#1/components/index.ts
            //* barrel file
            /src/features/feature#1/components/Comp.tsx
            //* component file
            /src/features/feature#1/components/<folder-name>/Comp.tsx
            //* for group multiple related components inside 1 folder or put things like index.tsx,Comp.example.tsx,test.tsx,style.module.scss,README.md
        /src/features/feature#1/layout
            /src/features/feature#1/layout/Navbar.tsx
            //* specific navbar of feature#1
            /src/features/feature#1/layout/Footer.tsx
            //* specific footer of feature#1
            /src/features/feature#1/layout/index.tsx
            //* final layout of feature#1 which combine all above components
        /src/features/feature#1/hooks
        /src/features/feature#1/providers
        /src/features/feature#1/database
            /src/features/feature#1/database/connection
            /src/features/feature#1/database/models
            /src/features/feature#1/database/services
        /src/features/feature#1/services
        /src/features/feature#1/styles
            //* import files inside this folder in /public/styles/global.scss file
        /src/features/feature#1/assets
        /src/features/feature#1/utils
        /src/features/feature#1/types
    ```
