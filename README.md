sacco-assist/
│
├── README.md
├── .gitignore
├── .env.example
├── package.json
├── render.yaml
│
├── docs/
│   ├── architecture.md
│   ├── api-spec.md
│   ├── data-model.md
│   ├── deployment.md
│   └── contributing.md
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── logger.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.model.js
│   │   │
│   │   ├── members/
│   │   │   ├── member.controller.js
│   │   │   ├── member.service.js
│   │   │   ├── member.routes.js
│   │   │   └── member.model.js
│   │   │
│   │   ├── savings/
│   │   │   ├── savings.controller.js
│   │   │   ├── savings.service.js
│   │   │   ├── savings.routes.js
│   │   │   └── savings.model.js
│   │   │
│   │   ├── loans/
│   │   │   ├── loan.controller.js
│   │   │   ├── loan.service.js
│   │   │   ├── loan.routes.js
│   │   │   └── loan.model.js
│   │   │
│   │   └── reports/
│   │       ├── report.service.js
│   │       └── report.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── utils/
│   │   ├── sms.js
│   │   ├── dates.js
│   │   └── validators.js
│   │
│   └── routes.js
│
├── workers/
│   ├── sms.worker.js
│   └── reports.worker.js
│
├── tests/
│   ├── auth.test.js
│   ├── members.test.js
│   └── loans.test.js
│
└── scripts/
    ├── seed.js
    └── migrate.js
