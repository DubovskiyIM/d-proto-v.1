import {Component, Inject, Injectable, OnInit, Provider} from '@angular/core';
import {AbstractTuiDialogService, TUI_DIALOGS, TuiDialog} from "@taiga-ui/cdk";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {TuiMobileDialogService} from "@taiga-ui/addon-mobile";

interface PromptOptions {
  readonly heading: string;
  readonly buttons: readonly [string, string];
}

@Component({
  selector: 'app-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrls: ['./dialog-prompt.component.scss']
})
export class DialogPromptComponent implements OnInit {

  constructor(@Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialog<PromptOptions, boolean>,
              @Inject(TuiMobileDialogService)
              private readonly dialogService: TuiMobileDialogService,
              ) { }

  ngOnInit(): void {
    // debugger;
    // this.dialogService.open('sd');
  }

  onClick(response: boolean) {
    this.context.completeWith(response);
  }

}


// Create service
@Injectable({
  providedIn: 'root',
})
export class PromptService extends AbstractTuiDialogService<PromptOptions> {
  readonly defaultOptions = {
    heading: 'Are you sure?',
    buttons: ['Yes', 'No'],
  } as const;
  readonly component = new PolymorpheusComponent(DialogPromptComponent);
}

// Add this provider to app module
export const PROMPT_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: PromptService,
  multi: true,
};
