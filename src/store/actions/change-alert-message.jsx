export const CHANGE_ALERT_MESSAGE = 'CHANGE_ALERT_MESSAGE';

export function changeAlertMessage(message, isError = false) {
    return {
        type: CHANGE_ALERT_MESSAGE,
        message: message,
        isError: isError
    }
}