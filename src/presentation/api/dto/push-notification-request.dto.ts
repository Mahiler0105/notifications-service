export class PushNotificationRequestDto {
  public deviceTokens: Array<string>;
  public notification: Notification;
}

class Notification {
  public title: string;
  public body: string;
  public imageUrl: string | null;
  public payload: Record<string, unknown>;
}
