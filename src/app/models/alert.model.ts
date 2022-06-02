type AlertType = 'success' | 'warning' | 'error';

export interface Alert {
    type: AlertType;
    messageText: string;
}
