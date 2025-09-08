`src\components\common\loading-states.tsx`

Line: `itemComponent: ItemComponent = ProjectCardSkeleton`
For the code present, we get this error:

```
Type '({ className, variant }: { className?: string | undefined; variant?: "default" | "featured" | "compact" | undefined; }) => Element' is not assignable to type 'ComponentType<{ className?: string | undefined; variant?: string | undefined; }>'.
  Type '({ className, variant }: { className?: string | undefined; variant?: "default" | "featured" | "compact" | undefined; }) => Element' is not assignable to type 'FunctionComponent<{ className?: string | undefined; variant?: string | undefined; }>'.
    Types of parameters '__0' and 'props' are incompatible.
      Type '{ className?: string | undefined; variant?: string | undefined; }' is not assignable to type '{ className?: string | undefined; variant?: "default" | "featured" | "compact" | undefined; }'.
        Types of property 'variant' are incompatible.
          Type 'string | undefined' is not assignable to type '"default" | "featured" | "compact" | undefined'.
            Type 'string' is not assignable to type '"default" | "featured" | "compact" | undefined'.
```

How can I resolve this? If you propose a fix, please make it concise.

In console:

```
✓ Starting...
 ✓ Ready in 1786ms
 ○ Compiling / ...
Error: Cannot apply unknown utility class `card-base`
    [at onInvalidCandidate (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:18:1529)]
    [at ge (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:13:29562)]
    [at C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:18:373]
    [at L (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:3:1656)]
    [at je (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:18:172)]
    [at bi (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:35:780)]
    [at async yi (C:\dev\my-portfolio\node_modules\.pnpm\tailwindcss@4.1.13\node_modules\tailwindcss\dist\lib.js:35:1123)]
    [at async Or (C:\dev\my-portfolio\node_modules\.pnpm\@tailwindcss+node@4.1.13\node_modules\@tailwindcss\node\dist\index.js:10:3384)]
    [at async W (C:\dev\my-portfolio\node_modules\.pnpm\@tailwindcss+postcss@4.1.13\node_modules\@tailwindcss\postcss\dist\index.js:10:4048)]
    [at async Object.Once (C:\dev\my-portfolio\node_modules\.pnpm\@tailwindcss+postcss@4.1.13\node_modules\@tailwindcss\postcss\dist\index.js:10:4318)]
 ✓ Compiled / in 4.5s

```
