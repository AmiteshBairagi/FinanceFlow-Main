 api/
      ├── client.ts           # Axios/Fetch client setup (baseURL, interceptors)
      ├── auth.api.ts         # Login, signup, logout, refresh tokens
      ├── user.api.ts         # Get/update user profile, preferences
      ├── account.api.ts      # CRUD accounts, get balances
      ├── transaction.api.ts  # CRUD transactions, filter, search
      ├── budget.api.ts       # CRUD budgets, fetch spending vs budget
      ├── goal.api.ts         # CRUD goals, progress tracking
      ├── bill.api.ts         # CRUD bills/EMIs, reminders
      ├── export.api.ts       # Export data (CSV, PDF, Excel)
      ├── calc.api.ts         # EMI, tax, interest calculators
      └── index.ts            # (optional) central export for all api modules
