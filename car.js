class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption,
  ) {
    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
  }

  #isValidString(val) {
    return typeof val === 'string' && val.length >= 1 && val.length <= 50;
  }

  #isValidYear(val) {
    const currentYear = new Date().getFullYear();

    return typeof val === 'number' && val >= 1900 && val <= currentYear;
  }

  #isValidSpeed(val) {
    return typeof val === 'number' && val >= 100 && val <= 300;
  }

  #isValidVolume(val) {
    return typeof val === 'number' && val >= 5 && val <= 20;
  }

  get brand() {
    return this.#brand;
  }

  set brand(val) {
    if (!this.#isValidString(val)) {
      throw new Error('Ошибка!');
    }

    this.#brand = val;
  }

  get model() {
    return this.#model;
  }

  set model(val) {
    if (!this.#isValidString(val)) {
      throw new Error('Ошибка!');
    }

    this.#model = val;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(val) {
    if (!this.#isValidYear(val)) {
      throw new Error('Ошибка!');
    }

    this.#yearOfManufacturing = val;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(val) {
    if (!this.#isValidSpeed(val)) {
      throw new Error('Ошибка!');
    }

    this.#maxSpeed = val;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(val) {
    if (!this.#isValidVolume(val)) {
      throw new Error('Ошибка!');
    }

    this.#maxFuelVolume = val;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(val) {
    if (typeof val !== 'number' || val <= 0) {
      throw new Error('Ошибка!');
    }

    this.#fuelConsumption = val;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start = () => {
    if (this.#isStarted === true) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine = () => {
    if (this.#isStarted === false) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank = (val) => {
    if (typeof val !== 'number' || val <= 0) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const amountFuelVolume = this.#currentFuelVolume + val;

    if (amountFuelVolume > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume = amountFuelVolume;
  }

  drive = (speed, hours) => {
    if (typeof speed !== 'number' || speed <= 0) {
      throw new Error('Неверная скорость');
    }

    if (typeof hours !== 'number' || hours <= 0) {
      throw new Error('Неверное количество часов');
    }

    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (this.#isStarted === false) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const distance = speed * hours;
    const currentFuelConsumption = (distance / 100) * this.#fuelConsumption;

    if (currentFuelConsumption > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= currentFuelConsumption;
    this.#mileage += distance;
  }
}

module.exports = { Car };