# Project D-Leña

## [See the App!](https://d-lena.netlify.app/)

![App Logo](./src/assets/images/Logo.png)

## Description

D-Leña es un proyecto inicial de una pizzeria con el objetivo de vender productos de forma online.

#### [Client Repo here](https://github.com/0mararal0/Project-D-Lena-client)

#### [Server Repo here](https://github.com/0mararal0/Project-D-Lena-server)

## Backlog Functionalities

- Se puede registrar usuario encriptando su password con la libreria bycript
  -Se puede logear usuario con con verificación de Token utilizando libreria jsonWebToken
- Se utiliza ruta para enviar imagenes reibidas en formato formData a cloudinary a través de Multer
- Se utilizan rutas para acceso a la base de datos Mongo DB tanto como usuario como administrador
- se utiliza middleware para la verificación de las rutas tanto las de admin como las de user.

## Technologies used

##### JAVASCRIPT

##### EXPRESS

##### BYCRIPT

##### CORS

##### JSONWEBTOKEN

##### CLOUDINARY

##### MULTER

##### MORGAN

##### MONGO-DB

# Server Structure

## Models

##### MODELOS BASE DE DATOS

###### MODELO USUARIO

```javascript
{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    phone: { type: String },
    photo: {
      type: String,
      default:
        "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x",
    },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
```

###### MODELO PRODUCTO

```javascript
{
    title: { type: String, required: true },
    description: { type: String },
    ingredients: { type: String },
    category: {
      type: String,
      enum: ["pizza", "pasta", "ensalada", "postre", "bebida"],
      required: true,
    },
    price: { type: String, required: true },
    img: { type: String },
  },
```

###### MODELO PEDIDO

```javascript
{
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendiente", "enviado", "entregado"],
      default: "pendiente",
    },
    address: { type: String, required: true },
    floor: { type: String },
    letter: { type: String },
    cp: { type: String },
    city: { type: String, required: true },
    province: { type: String },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
```

## API Endpoints (backend routes)

| HTTP Method | URL                  | Request Body            | Success status | Error Status | Description                                   |
| ----------- | -------------------- | ----------------------- | -------------- | ------------ | --------------------------------------------- |
| POST        | `/auth/signup`       | {name, email, password} | 201            | 400          | Registrarse en la base de datos               |
| POST        | `/auth/login`        | {username, password}    | 200            | 400          | Valida usuario y envia Token                  |
| GET         | `/admin/product`     |                         | 200            | 400          | Envía todos los productos de la base de datos |
| POST        | `/admin/product`     | {product}               | 201            | 400          | Crea un producto en la base de datos          |
| PUT         | `/admin/product/:id` | {product}               | 202            | 400          | Modifica un producto                          |
| DELETE      | `/admin/product/:id` |                         | 202            | 400          | Borra productos                               |
| PUT         | `/admin/user/:id`    | {user}                  | 202            | 400          | Edita usuarios desde el administrador         |
| GET         | `/admin/user`        |                         | 200            | 400          | Muestra todos los usuarios                    |
| GET         | `/admin/user/:id`    |                         | 200            | 400          | muestra un usuario concreto                   |
| GET         | `/admin/order`       |                         | 200            | 400          | Muestra todos los pedidos creados             |
| PUT         | `/admin/order/:id`   | {order}                 | 202            | 400          | Modifica un pedido creado                     |
| GET         | `/user/profile/:id`  | {user}                  | 200            | 400          | muestra el perfil de un usuario concreto      |
| PUT         | `/user/profile/:id`  | {user}                  | 202            | 400          | Modifica perfil usuario                       |
| GET         | `/user/order/:id`    |                         | 200            | 400          | Muestra pedido de un usuario                  |
| POST        | `/user/order`        | {order}                 | 201            | 400          | Crea pedido de un usuario                     |
| PUT         | `/user/order`        | {order}                 | 202            | 400          | Modifica pedido de un usuario                 |
| POST        | `/upload`            | {photo}                 | 201            | 400          | Envía foto a cloudinary                       |
| GET         | `/`                  |                         | 201            | 400          | Ruta para realizar pruebas                    |

## Links

### Created by

[Developer Alberto Marcos](https://github.com/0mararal0)

### Project

[Repository Link Client](https://github.com/0mararal0/Project-D-Lena-client)

[Repository Link Server](https://github.com/0mararal0/Project-D-Lena-server)

[Deploy Link](https://d-lena.netlify.app/)

### Slides

[Slides Link](https://excalidraw.com/#json=gchSEeamaCNBwVWcxzBFA,WpoS0CCEKq0uQS5S7ouftg)
