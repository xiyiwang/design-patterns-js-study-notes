// # CREATIONAL PATTERNS

// ## Creational Pattern 1: Class Design Pattern

class Car {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

const civic = new Car(4, 'V6', 'grey');

// ## Creational Pattern 2: Contributor Pattern

// class Car {constructor(){...}}
class SUV extends Car {
    constructor(doors, engine, color) {
        super(doors, engine, color);
        this.wheels = 4; // add default
    }
}

const cx5 = new SUV(4, 'V8', 'red');

// ## Creational Pattern 3: Singleton Pattern

let instance = null;

class SingletonCar {
    constructor(doors, engine, color) {
        if (!instance) {
            this.doors = doors;
            this.engine = engine;
            this.color = color;
            instance = this;
        } else {
            return instance;
        }
    }
}

const civic2 = new SingletonCar(4, 'V6', 'grey');
const honda = new SingletonCar(2, 'V8', 'red'); // this will be created as a copy of civic2

// ## Creational Pattern 4: Factory Pattern

// class Car {constructor(){...}}
class CarFactory {
    createCar(type) {
        switch(type) {
            case 'civic':
                return new Car(4, 'V6', 'grey')
            case 'honda':
                return new Car(2, 'V8', 'red')
        }
    }
}

const factory = new CarFactory();
const myHonda = factory.createCar('honda');

// ## Creational Pattern 5: Abstract Factory Pattern

// class Car {constructor(){...}}
// class CarFactory {createCar(type){...}}
class Jeep {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}
class JeepFactory {
    createJeep(type) {
        switch(type) {
            case 'cx5':
                return new Jeep(4, 'V6', 'grey')
            case 'sante fe':
                return new Jeep(6, 'V8', 'red')
        }
    }
}
const carFactory = new CarFactory();
const jeepFactory = new JeepFactory();

const autoManufacturer = (type, model) => {
    switch(type) {
        case 'car':
            return carFactory.createCar(model)
        case 'jeep':
            return jeepFactory.createJeep(model)
    }
}

const myCx5 = autoManufacturer('jeep', 'cx5');

// ----------------------------------------

// # STRUCTURAL PATTERNS

// ## Structural Pattern 2: Mixins Pattern
let carMixin = {
    revEngine() {
        console.log(`The ${this.engine} engine is doing Vroom Vroom!`);
    }
}

Object.assign(Car.prototype, carMixin); // this passes all car prototypes to carMixin

const anotherHonda = autoManufacturer('car', 'honda');

anotherHonda.revEngine();

// ----------------------------------------

// # BEHAVIORAL PATTERNS

// ## Behavioral Pattern 1: Observer Pattern
class GasTank {
    constructor(gas) {
        this.gas = gas;
    }

    setGasLevel(val) {
        this.gas = val;
        this.notifyAll();
    }

    register(observer) {
        this.actions.push(observer);
    }

    unregister(observer) {
        this.actions.remove.filter(function(el) {
            return el !== observer;
        });
    }

    notifyAll() {
        return this.actions.forEach(function(el) {
            el.update(this);
        }.bind(this));
    }
}

// ## Behavioral Pattern 4: Iterator Pattern
newsfeeds = [
    {
        type: 'top-headlines',
        query: 'sources=bbc-news'
    },
    {
        type: 'everything',
        query: 'domains=techcrunch.com&language=en'
    },
    {
        type: 'technology',
        query: 'domains=comicbookmovie.com&language=en'
    }
]

for (let feed of newsfeeds) {
    console.log(feed.type);
}

// ## Behavioral Pattern 7: Mediator Pattern
class TrafficTower {
    constructor() {
        this.airplanes = [];
    }

    requestPositions() {
        return this.airplanes.map(airplane => {
            return airplane.position;
        });
    }
}

class Airplane {
    constructor(position, trafficTower) {
        this.position = position;
        this.trafficTower = trafficTower;
        this.trafficTower.airplanes.push(this);
    }

    requestPositions() {
        return this.trafficTower.requestPositions();
    }
}
