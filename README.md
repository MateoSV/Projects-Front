## Análisis

Para mantener una arquitectura limpia y modular, hemos decidido separar la aplicación en varias capas, cada una con responsabilidades específicas:  
- Componentes de Presentación (Views): Esta capa incluye todos los componentes de Vue que se encargan de la interfaz de usuario. Aquí se manejan las interacciones del usuario y se muestran los datos.  
- Composables (Composables): Los composables encapsulan la lógica de la interfaz y las interacciones con los servicios. En Vue, utilizamos composables para crear lógica reutilizable que puede ser compartida entre diferentes componentes.  
- Servicios (Services): Los servicios encapsulan la lógica de negocio y pueden ser utilizados por cualquier componente que los necesite. Estos servicios se encargan de la lógica de negocio más compleja y de la coordinación entre diferentes repositorios.  
- Repositorios (Repositories): Los repositorios se encargan de las operaciones CRUD y la comunicación con el backend. Estos se implementan como funciones que realizan llamadas HTTP a las APIs.  
- Interfaces (Interfaces): Las interfaces definen los tipos y estructuras de datos utilizados en la aplicación, asegurando consistencia y tipado fuerte.

Para mantener la aplicación limpia y extensible, hemos aplicado los principios SOLID de la siguiente manera:  
- Single Responsibility Principle (SRP): Cada componente, composable, servicio y repositorio tiene una única responsabilidad. Los componentes de Vue se encargan de la interfaz de usuario, los composables encapsulan la lógica de la interfaz, los servicios manejan la lógica de negocio más compleja y los repositorios manejan la comunicación con el backend.  
- Open/Closed Principle (OCP): La arquitectura está diseñada para ser extensible sin modificar el código existente. Por ejemplo, podemos agregar nuevos servicios o repositorios sin cambiar los componentes que ya existen.  
- Liskov Substitution Principle (LSP): Los componentes y servicios pueden ser reemplazados por otros que implementen la misma interfaz sin afectar el funcionamiento de la aplicación.  
- Interface Segregation Principle (ISP): Hemos definido interfaces claras y específicas para cada entidad, como ITask, para asegurar que los componentes y servicios solo dependan de lo que realmente necesitan.  
- Dependency Inversion Principle (DIP): Los componentes dependen de abstracciones (interfaces) en lugar de implementaciones concretas. Esto facilita la inyección de dependencias y el testeo.

- Uso de Composables: Decidimos utilizar composables para encapsular la lógica de la interfaz y hacerla reutilizable entre diferentes componentes. Esto mejora la modularidad y facilita el mantenimiento del código.  
- Interfaces Claras: Definimos interfaces claras para las entidades principales, como ITask, para asegurar que los datos sean consistentes y fáciles de manejar.  
- Separación de Responsabilidades: Mantuvimos una clara separación de responsabilidades entre componentes, composables, servicios y repositorios para asegurar que cada parte de la aplicación sea fácil de entender y mantener.  

Esta arquitectura nos permite desarrollar una aplicación escalable, mantenible y fácil de extender en el futuro.

### Repository Pattern
El patrón de repositorio se utiliza para abstraer la lógica de acceso a datos y proporcionar una interfaz limpia para las operaciones CRUD. Esto permite que la lógica de negocio no dependa directamente de la implementación de acceso a datos, facilitando el mantenimiento y las pruebas.

### Service Pattern
El patrón de servicio encapsula la lógica de negocio y coordina las operaciones entre diferentes repositorios. Esto permite que los componentes de la interfaz de usuario se mantengan simples y enfocados en la presentación.

# projects-front

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
