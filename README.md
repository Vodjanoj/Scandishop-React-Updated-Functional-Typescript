# Ecommerce Shop

This is the frontend part of an ecommerce shop web application built using React.js. It is a test assignment for Scandiweb company.<br /><br />

## Getting Started

1. Clone this repository
2. Install dependencies using `npm install`
3. Run the application using `npm start`<br />

## Dependencies

- React.js
- React Router
- Redux/Toolkit
- Redux-Persist
- GraphQL
- Apollo Client<br />

## Features

- Browse products by categories
- Select any of the 5 available currencies and view product prices
- View product details:
  - See multiple product images
  - Select product image to view it in big format
  - Select different product attributes (size, color, etc.)
  - Read detailed product descriptions and specifications
- Quickly add products to a shopping cart with default attributes
- Add products to a shopping cart with selected attributes:
  - See added products on the cart page and in a cart overlay (minicart)
  - Adjust product quantity in the shopping cart (add/delete) and in a cart overlay
  - Use a slider to view different images of a product on the cart page<br />

## Folder Structure

- `src` - contains the source code of the application
  - `assets` - contains the images and other static assets used in the application
  - `components` - contains the reusable components used in the application
  - `graphql` - contains the GraphQL API services used in the application
  - `store` - contains the Redux/Toolkit store configuration and slice files<br />

## Screenshots
Here are some screenshots of the ecommerce shop web application in action:

### Home/Category page 

![Category](/src/screenshots/category.jpg?raw=true)<br />

### Product Page
![Product Page](/src/screenshots/product_page.jpg?raw=true)<br />

### Cart Overlay 
![Cart Overlay](/src/screenshots/mini_cart.jpg?raw=true)<br />

### Cart Page
![Cart Page](/src/screenshots/cart.jpg?raw=true)<br />
## API
This frontend part of the ecommerce shop web application communicates with the backend GraphQL API, which is located in a separate repository which can be found at https://github.com/scandiweb/junior-react-endpoint. Please refer to the backend repository's README.md file for instructions on how to run the server and set up the database.