# TaskFlow — Capstone Project Spec

A team task manager. Every feature below exists to exercise a specific line from the JD — nothing decorative.

## JD Requirement → Feature Mapping

| JD Requirement | TaskFlow Feature |
|---|---|
| Angular v12+, responsive apps | Whole app, SCSS + flexbox/grid layout |
| Modular architecture, lazy loading | Core/Shared/feature-module split, 3 lazy-loaded modules |
| Routing | Auth → Dashboard → Tasks → Projects, nested routes, guards |
| RxJS | Debounced task search, loading states, combineLatest for dashboard |
| REST API integration | Full CRUD against a local mock API (json-server) |
| TypeScript/SCSS | Typed models throughout, SCSS partials |
| NgRx (good to have) | Task state moved to a store: actions/reducer/effects/selectors |
| Jasmine/Karma (good to have) | Tests for one service, one component, one reducer |
| Node.js basics (good to have) | You already have this — json-server IS a Node process, mention it in interview |
| Code quality / debugging | Consistent module structure, README, meaningful commit history |

## Architecture

```
src/app/
├── core/                      ← singleton services, imported ONCE in AppModule
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── api.service.ts      (HttpClient wrapper)
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   └── guards/
│       └── auth.guard.ts
├── shared/                     ← reusable components/pipes, imported by feature modules
│   ├── components/
│   │   └── loading-spinner/
│   └── pipes/
│       └── status-badge.pipe.ts
├── auth/                       ← LAZY module
│   └── login/
├── dashboard/                  ← LAZY module (protected)
├── tasks/                      ← LAZY module (protected)
│   ├── store/                  ← NgRx: actions, reducer, effects, selectors
│   ├── task-list/
│   ├── task-form/
│   └── models/task.model.ts
├── projects/                   ← LAZY module (protected, demonstrates 2nd feature module)
├── app-routing.module.ts       ← top-level routes, each feature module lazy-loaded
└── app.module.ts
```

## Build Order (do in this sequence — each step depends on the last)

1. **Scaffold architecture** — create Core/Shared/feature module folders + empty lazy routes wired up in `app-routing.module.ts`. Confirm each feature module loads its own JS chunk (`ng build` → check `dist/` for separate bundle files, or watch Network tab in dev tools for the chunk request when navigating).

2. **Mock backend** — `npm install -g json-server`, create `db.json` with `tasks`, `projects`, `users` arrays, run `json-server --watch db.json --port 3000`. Gives you real CRUD endpoints without needing a real backend.

3. **Auth flow** — login form (Reactive Forms + validators), `AuthService` (fake-checks credentials against json-server `users`, stores a token in memory/localStorage), `AuthGuard` (`CanActivate`) protecting Dashboard/Tasks/Projects routes.

4. **Core HTTP layer** — `ApiService` wrapping `HttpClient` with typed methods (`getTasks(): Observable<Task[]>`, etc.), `AuthInterceptor` attaching the token to every outgoing request.

5. **Task list** — fetch + display via `*ngFor`, `async` pipe, typed `Task` model, loading/error states handled with RxJS (`catchError`, a loading `BehaviorSubject`).

6. **Search + filter** — input box wired to `switchMap` + `debounceTime` + `distinctUntilChanged`, filtering the task list live. This is your answer if asked "give an example of RxJS in a real app."

7. **Create/edit task** — Reactive Form with validators (required title, enum status field via a `<select>`), POST for create / PUT for edit against json-server.

8. **NgRx migration** — move task state (list, loading, selected task) out of the component into a store: `actions.ts`, `reducer.ts`, `effects.ts` (calls `ApiService`), `selectors.ts`. Refactor `task-list` and `task-form` to read from the store instead of calling the service directly. This refactor itself is a great interview story — "here's how I moved from component state to NgRx and why."

9. **Projects module** — second lazy module with its own routes, list/detail views, at least one nested/child route (e.g. `/projects/:id/tasks` showing tasks scoped to a project) — proves you understand modular architecture beyond just one feature.

10. **Styling pass** — SCSS partials (`_variables.scss`, `_mixins.scss`), responsive layout, consistent look across all views.

11. **Testing** — unit test `ApiService` (mock `HttpClientTestingModule`), unit test one component (`TestBed`, check it renders task count), unit test the reducer (pure function, easiest to test — good one to lead with if asked to write a test live).

12. **Performance pass** — `OnPush` change detection on list components, `trackBy` in every `*ngFor`, verify lazy chunks in prod build (`ng build --configuration production`), check bundle sizes.

## Interview payoff
By the end you can describe: why you split Core/Shared/feature modules, why NgRx over plain service state, how the search debouncing works, how the auth guard + interceptor cooperate, and what you'd test first in a new component. That's a complete, defensible answer to almost any Angular interview question this JD implies.
