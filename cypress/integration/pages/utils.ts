export class Utils {

    public static randomLongId() {
      return Utils.randomIntFromInterval(1000000000, 9999999999);
    }

    static randomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
