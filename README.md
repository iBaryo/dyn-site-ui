# Dyn Site Creator UI
## Getting Started
To run the project locally, follow the steps below.

- Clone the repo
- `npm i`
- `npm start`
- Browse to [http://localhost:4200](http://localhost:4200)

## Adding/Removing Supported Types
Go to `ComponentsSetup.ts`.

```typescript
container.add(
    alignment: 'frontend'|'backend'|'feature',
    cmpType: ICodeComponentType<any>,
    editorComponent: Type<any>, // angular component
    editorOptions: Object
);
```