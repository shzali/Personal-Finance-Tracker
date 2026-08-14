### 14th August 2026

- Added a 'BigPurchaseMoney' model that will keep track of the pot for big purchase savings, including transactions from it.

### 13th August 2026

- Added some more models: Expense and Category. This is for ensuring that individual expenses persist, and can be loaded when a page for a month loads.

### 12th August 2026

- A list of months is displayed. Clicking on a month will go to its corresponding expenses page (data does not persist yet).
- 'Recreational' renamed to 'Fun' for simplicity.
- 'Fun' money is a small, short-term purchase for pure enjoyment. Can specify the Fun budget, and Fun expenses will deduct from it.
- Shows Fun money spillover
- All monthly data, except the individual expenses (for now), is persistent if 'SAVE' is clicked.

### 7th August 2026

- Can add a category

### 6th August 2026

- Can assign an expense to a category (no meaningful purpose yet).
- Can remove an expense.
- Can specify if the expense is recreational

### 5th August 2026

- First commit and deployed to Netlify.
- Enter income for the month and any expenses. The application calculates the money to be put into investments and savings according to the provided ratio.
