var app = Application.currentApplication()
app.includeStandardAdditions = true
import { ProgressBar } from "./progress";

const notify = (message: string, submessage: string) => {
    ProgressBar.setTotal(-1)
    ProgressBar.setCount(0)
    ProgressBar.setText({title: message, subtitle: submessage})
}

export default notify

export const dialog = (alertText: string, options?: {
    message: string
}) => {
    //@ts-ignore
    app.displayDialog(alertText)
}