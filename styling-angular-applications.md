URL of Styling Angular Applications project (go through branches):
https://github.com/pluralsight-styling-angular-apps/demos-v2.git

### Review:

:host, :host-context, ::ng-deep

### Use BEM

But instead of navbar-header, navbar-header**item and navbar-header**item-link
use items, item, item\_\_link.

### stylePreprocessorOptions

See stylePreprocessorOptions to include paths of CSS, like:

```
"stylePreprocessorOptions": {
  includePaths: {
    'src/app/shared/scss/root'
  }
}
```

So I can change: `@import 'shared/scss/root/colors';` to `@import 'colors';`

### Create a shared/scss folder and partials

Create a shared/scss folder and partials for:
\_mixins.scss
\_variables.scss
etc
If specific to a component, put on top of component scss file all the variables and mixins declarations,
remember to separate blocks with comments

### Theming

- Separate files on partials for each theme or layout (\_color-01.scss, \_color-02.scss, \_layout-01.scss, \_layout-02.scss)
- Use host with a specific class, like :host(.color--01) { }
- If you need different themes for child components, use context: :host-context(.color--01) { } or :host-context(saa-model.color--01) { }
  If need an icon only if a content projection is passed (branch module-04-10):
- Use ng-content with select (<ng-content select="saa-message-content"></ng-content>);
- Add logic to check if it exists: @ContentChild(MessageContentDirective) messageContent: MessageContentDirective;
- And add logic to html to show only if this reference exists \*ngIf="messageContent".

```
<saa-message>
  <saa-message-title>Your Account is Expiring!</saa-message-title>
  <saa-message-content>Your account will expire within the next thirty days. Please update your payment method in your account.</saa-message-content>
</saa-message>
```

```
<div class="message__content" *ngIf="messageContent">
  <svg class="message__icon" viewBox="0 0 24 24">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"></path>
  </svg>
  <ng-content select="saa-message-content"></ng-content>
</div>
```

```
export class MessageComponent {
  @ContentChild(MessageContentDirective) messageContent: MessageContentDirective;
}
```

If they're based on class to specific layout, add hostRef (branch module-04-11)

```
isLayout01 = false;
constructor(private hostRef: ElementRef) {}
ngAfterContentInit(): void {
    this.isLayout01 = this.hostRef.nativeElement.classList.contains('layout--01');
}
```

```
<svg viewBox="0 0 24 24" class="icon" *ngIf="!isLayout01">
    <path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
</svg>
<div class="message">
    <h2 class="message__title">
        <ng-content select="saa-message-title"></ng-content>
    </h2>
    <div class="message__content" *ngIf="messageContent">
        <svg class="message__icon" viewBox="0 0 24 24" *ngIf="isLayout01">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"></path>
        </svg>
        <ng-content select="saa-message-content"></ng-content>
    </div>
</div>
```
