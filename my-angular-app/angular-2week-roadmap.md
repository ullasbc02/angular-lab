# Angular Developer — 2-Week Full-Time Roadmap

**Starting point:** React + full-stack project experience, Java Spring Boot / Node.js backend, comfortable with JS/TS-adjacent concepts, REST APIs, Git.
**Goal:** Interview-ready for a 0–3yr Angular Web Developer role (Angular v12+, RxJS, routing, lazy loading, REST integration; NgRx/Jasmine-Karma as bonus).
**Format:** ~6–7 hrs/day. Two projects built along the way so you have real talking points, not just tutorial completion.

---

## Week 1 — Core Angular + RxJS

### Day 1: TypeScript refresher + Angular setup
- TS: interfaces, types vs interfaces, generics, decorators, enums, access modifiers (public/private/protected), optional chaining
- Install Angular CLI, `ng new`, project structure walkthrough
- Understand: NgModules, bootstrapping, `main.ts` → `AppModule` → `AppComponent` flow
- **Output:** a scaffolded project you understand file-by-file, not just generated

### Day 2: Components + Data Binding
- Component decorator, templates, styles (view encapsulation)
- Interpolation, property binding, event binding, two-way binding (`[(ngModel)]`)
- `@Input()` / `@Output()` + `EventEmitter` — parent-child communication
- Compare mentally to React props/callbacks — this maps closely to what you already know

### Day 3: Directives, Pipes, Lifecycle Hooks
- Structural directives: `*ngIf`, `*ngFor`, `*ngSwitch`
- Attribute directives: `ngClass`, `ngStyle`
- Built-in pipes + writing a custom pipe
- Lifecycle: `ngOnInit`, `ngOnChanges`, `ngOnDestroy` (this last one matters a lot — Angular doesn't unmount like React, subscriptions leak if you don't clean up)

### Day 4: Services, Dependency Injection, HttpClient
- `@Injectable()`, providedIn: 'root', constructor injection
- Why DI exists (testability, singleton services) — be ready to explain this in interview
- `HttpClient`: GET/POST/PUT/DELETE, interceptors (auth token pattern), error handling
- Build a service layer hitting a public REST API (e.g. JSONPlaceholder or similar)

### Day 5: Routing, Guards, Lazy Loading
- `RouterModule`, `routerLink`, route params, query params
- Route guards: `CanActivate`, `CanDeactivate`
- **Lazy loading + feature modules** — explicitly called out in the JD, don't skip
- Nested/child routes

### Day 6: RxJS Fundamentals
- Observable vs Promise (the mental shift from your React/JS background)
- `Subject`, `BehaviorSubject`, `ReplaySubject` — when to use which
- Subscribing, unsubscribing, `takeUntil` pattern for cleanup
- Async pipe in templates (avoids manual subscribe/unsubscribe)

### Day 7: RxJS Operators + Mini Project 1
- Operators: `map`, `filter`, `switchMap`, `mergeMap`, `concatMap`, `debounceTime`, `distinctUntilChanged`, `catchError`
- Know *why* `switchMap` is used for typeahead/search (cancels previous request) — common interview question
- **Mini Project: Search-as-you-type app** (e.g. GitHub user search or weather app)
  - Debounced input → API call → display results
  - Forces you to actually use switchMap + debounceTime + error handling together

---

## Week 2 — Forms, State, Testing, Capstone, Interview Prep

### Day 8: Forms
- Template-driven forms vs Reactive Forms (know the trade-offs, be ready to state a preference)
- `FormGroup`, `FormControl`, `FormBuilder`, validators (built-in + custom)
- Dynamic forms with `FormArray`

### Day 9: State Management (NgRx basics)
- Redux pattern: store, actions, reducers, selectors, effects
- If you know Redux/Context from React, this maps almost directly — use that
- Don't over-invest here; it's "good to have," conceptual fluency is enough for a 0–3yr role

### Day 10: Testing (Jasmine + Karma)
- `TestBed`, `ComponentFixture`, basic component test
- Testing services with mocked HttpClient (`HttpClientTestingModule`)
- You don't need deep coverage — enough to write 3-4 real tests and explain the pattern

### Day 11–13: Capstone Project
Build one complete app that hits every required skill in the JD:
- **Suggestion:** Task/Project manager app, or a lightweight e-commerce catalog
- Must include:
  - Multiple lazy-loaded feature modules
  - A service layer with full REST CRUD against a real or mock backend (you can even spin up a quick Node/Express API — plays to your backend strength)
  - Reactive Forms with validation
  - Route guards (e.g. protect a "my orders" route)
  - RxJS used meaningfully (search/filter with switchMap+debounce)
  - At least one NgRx-managed piece of state (even just cart or task list)
  - A handful of unit tests
- This project is your interview story — you should be able to describe its architecture unprompted

### Day 14: Interview Prep
- **Angular vs React talking points** — you'll be asked this directly, given the JD explicitly excludes React. Prepare a genuine, non-defensive answer for "why Angular, why this switch."
- Core concept review: change detection (default vs OnPush), zone.js basics, lifecycle hooks, DI hierarchy, RxJS operator differences (switchMap vs mergeMap vs concatMap)
- Walk through your capstone project out loud, unscripted, twice
- Prepare 2-3 questions to ask them about their codebase/Angular version/testing culture

---

## Notes
- Use the official Angular docs (angular.dev) as primary reference — most current and matches v12+ conventions closely enough.
- Don't skip Day 14's spoken walkthrough — explaining your own project clearly under pressure is a different skill than building it.
