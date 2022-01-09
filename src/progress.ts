export class ProgressBar {
    private static count = 0;
    private static total = 0;

    public static setTotal(total: number) {
        //@ts-ignore
        Progress.totalUnitCount = total
        this.total = total
    }
    public static setCount(count: number) {
        //@ts-ignore
        Progress.completedUnitCount = count
        this.count = count
        console.log(`Setting Progress to ${this.count}/${this.total}`)
    }

    public static incCount() {
        this.count += 1
        //@ts-ignore
        Progress.completedUnitCount = this.count
        console.log(`Setting Progress to ${this.count}/${this.total}`)
    }
    public static setText(text: {title: string, subtitle: string}) {
        //@ts-ignore
        Progress.description = text.title
        //@ts-ignore
        Progress.additionalDescription = text.subtitle
    }
}