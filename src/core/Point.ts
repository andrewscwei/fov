type PointArrayDescriptor = Readonly<[number, number]>;
type PointJsonDescriptor = Readonly<{ x: number, y: number }>;
export type PointDescriptor = PointArrayDescriptor | PointJsonDescriptor;

/**
 * A class for defining structure and utilities for 2D vectors.
 */
export default class Point {
  /**
   * Checks if an object can be used to instantiate a new Point instance.
   *
   * @param descriptor - Descriptor used to instantiate a new Point instance.
   *
   * @return `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is PointDescriptor {
    if (descriptor instanceof Array) {
      if (descriptor.length !== 2) return false;
      if (typeof descriptor[0] !== 'number') return false;
      if (typeof descriptor[1] !== 'number') return false;
      return true;
    }
    else if (typeof descriptor === 'object') {
      if (typeof descriptor.x !== 'number') return false;
      if (typeof descriptor.y !== 'number') return false;
      return true;
    }
    else {
      return false;
    }
  }

  readonly x: number;
  readonly y: number;

  /**
   * Creates a new Point instance.
   *
   * @param {Object|Array} [descriptor=[0,0]] - Either an array of exactly 2
   *                                            numbers or a valid object with
   *                                            `x` and `y` keys.
   */
  constructor(descriptor: PointDescriptor = [0, 0]) {
    if (!Point.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor');

    if (descriptor instanceof Array) {
      this.x = descriptor[0];
      this.y = descriptor[1];
    }
    else {
      this.x = (descriptor as { [key: string]: number }).x;
      this.y = (descriptor as { [key: string]: number }).y;
    }
  }

  /**
   * Clones the current Point and returns a new Point.
   *
   * @param newDescriptor - New Point descriptor to replace the current one.
   *
   * @return The cloned instance.
   */
  clone(newDescriptor: Partial<PointJsonDescriptor> = {}): Point {
    return new Point({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : this.x,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : this.y,
    });
  }

  /**
   * Adds a Point to the current Point.
   *
   * @param point - The Point to add.
   *
   * @return The resulting Point.
   */
  add(point: Point): Point {
    return new Point({
      x: this.x + point.x,
      y: this.y + point.y,
    });
  }

  /**
   * Subtracts a Point from the current Point.
   *
   * @param point - The Point to subtract.
   *
   * @return The resulting Point.
   */
  subtract(point: Point): Point {
    return new Point({
      x: this.x - point.x,
      y: this.y - point.y,
    });
  }

  /**
   * Multiplies a Point with current Point.
   *
   * @param point - The Point to multiply.
   *
   * @return The resulting Point.
   */
  multiply(point: Point): Point {
    return new Point({
      x: this.x * point.x,
      y: this.y * point.y,
    });
  }

  /**
   * Devices the current Point by another Point.
   *
   * @param point - The Point divisor.
   *
   * @return The resulting Point.
   */
  divideBy(point: Point): Point {
    return new Point({
      x: this.x / point.x,
      y: this.y / point.y,
    });
  }

  /**
   * Returns a new Point with inverted X/Y values.
   *
   * @return The resulting Point.
   */
  invert(): Point {
    return new Point({
      x: this.y,
      y: this.x,
    });
  }

  /**
   * Checks to see if the current Point is equivalent to another Point.
   *
   * @param point - Point instance to compare with.
   *
   * @return `true` if equal, `false` otherwise.
   */
  equals(point: Point): boolean {
    if (this.x !== point.x) return false;
    if (this.y !== point.y) return false;
    return true;
  }

  /**
   * Returns a JSON object that represents the current Point.
   *
   * @return} The resulting JSON object.
   */
  toJSON(): PointJsonDescriptor {
    return Object.freeze({
      x: this.x,
      y: this.y,
    });
  }

  /**
   * Returns an array that represents the current Point.
   *
   * @return The resulting array.
   */
  toArray(): PointArrayDescriptor {
    return [this.x, this.y];
  }
}
