# Transfero JS Client API

This is a JavaScript client for the Transfero API. It provides an easy-to-use interface for interacting with the Transfero API, including authentication and payout functionality.

### Installation

To install the Transfero JS Client API, you can use npm:

```sh
npm install transfero-js-api-client
```

### Usage
First, import the TransferoClient class from the package:

```typescript
import { TransferoClient } from 'transfero-js-api-client';
```

Then, create a new instance of the client:

```typescript
const client = new TransferoClient();
```

You can now use the client instance to interact with the Transfero API.

### API
The Transfero JS Client API provides the following classes:

* AuthAPI: Handles authentication with the Transfero API.
* PayoutAPI: Handles payouts via the Transfero API.

### Building

To build the project, run the following command:

```sh
npm run build
```

### Testing

To run the tests, use the following command:

```sh
npm run test
```

### Contributing
Contributions are welcome! Please open an issue or submit a pull request on our GitHub repository.

### License
This project is licensed under the ISC license.
