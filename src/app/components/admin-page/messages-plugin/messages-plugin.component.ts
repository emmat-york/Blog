import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-messages-plugin',
  templateUrl: './messages-plugin.component.html',
  styleUrls: ['./messages-plugin.component.scss']
})
export class MessagesPluginComponent implements OnInit, OnDestroy {
  @Input() public delay = 5000;
  public messageText: string;
  public type = "success";
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly alertService: AlertService) { }

  public ngOnInit(): void {
    this.alertService.alert$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((alert) => {
      this.messageText = alert.messageText;
      this.type = alert.type;

      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        this.messageText = "";
      }, this.delay);
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
