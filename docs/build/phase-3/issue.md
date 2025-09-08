Error 1: Runtime Error

```
## Error Type
Runtime Error

## Error Message
Invalid src prop (https://via.placeholder.com/600x400/1f2937/ffffff?text=E-Commerce+Platform) on `next/image`, hostname "via.placeholder.com" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host


    at ProjectCard (src/components/portfolio/project-card.tsx:55:9)
    at <unknown> (src/components/sections/projects-section.tsx:126:17)
    at Array.map (<anonymous>:null:null)
    at ProjectsSection (src/components/sections/projects-section.tsx:125:33)
    at Home (src\app\page.tsx:16:7)

## Code Frame
  53 |         isCompact ? "aspect-video" : "aspect-[4/3]"
  54 |       )}>
> 55 |         <Image
     |         ^
  56 |           src={project.image}
  57 |           alt={project.title}
  58 |           fill

Next.js version: 15.5.2 (Turbopack)


```

Error 2: `about-section.tsx`

For the code present, we get this error:

```
Type '{ children: Element; id: string; title: string; subtitle: string; className: string | undefined; background: "muted"; }' is not assignable to type 'IntrinsicAttributes & SectionWrapperProps'.
  Property 'title' does not exist on type 'IntrinsicAttributes & SectionWrapperProps'.
```

How can I resolve this? If you propose a fix, please make it concise.

Error 3: `projects-section.tsx`

For the code present, we get this error:

```
Type '{ children: Element; id: string; title: string; subtitle: string; className: string | undefined; }' is not assignable to type 'IntrinsicAttributes & SectionWrapperProps'.
  Property 'title' does not exist on type 'IntrinsicAttributes & SectionWrapperProps'.
```

How can I resolve this? If you propose a fix, please make it concise.
