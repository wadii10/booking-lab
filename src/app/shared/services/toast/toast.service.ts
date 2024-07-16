import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(title: string, content: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: content,
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: content,
    });
  }

  showInfo(title: string, content: string) {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: content,
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Message Content',
    });
  }

  showContrast() {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Error',
      detail: 'Message Content',
    });
  }

  showSecondary() {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail: 'Message Content',
    });
  }
}
