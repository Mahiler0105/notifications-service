export class PushNotification {
  constructor(
    public title: string,
    public body: string,
    public imageUrl: string | null,
    public payload: Record<string, unknown>,
  ) {}
}
