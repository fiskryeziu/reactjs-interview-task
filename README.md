## 📌 Flex Business Solutions Tech Test - Notes ap
Notes App is a simple app that fetches a list of products from a mocked database using JSON Server and allows the user to create a category,search notes of that particular category, create, update and delete note.

## ⚙️ Setting Up

## 🚀 Run Locally
1.Clone the reactjs-interview-task repository:
```sh
git clone https://github.com/fiskryeziu/reactjs-interview-task
```
2.Install the dependencies with one of the package managers listed below:
```bash
npm install
```
3.Start the development mode:
```bash
npm run dev
```
4.Start mock server (json-server)
```bash
npm run server
```
5.Start testing (make sure the server it's active)
```bash
npm run test
```


### Regarding the questions

1. How might you make this app more secure?

   1. To make it more secure I would use Authentication where only the authenticated users can use the noteapp
   2. Validation to prevent injection attacks.
   3. Secure database configurations such as limiting database access to trusted IP addresses

2. How would you make this solution scale to millions of records?
   1. Caching: Would use servises like redis to handle the caching and reduce database load.
   2. To scale more like adding more servers to handle increased traffic and workload.



