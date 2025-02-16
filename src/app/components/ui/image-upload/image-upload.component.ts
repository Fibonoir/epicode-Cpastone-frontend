import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-image-upload',
    imports: [CommonModule, DragDropModule],
    templateUrl: './image-upload.component.html',
    styles: [
        `
            .cdk-drag-preview {
                box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                    0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12);
            }

            .cdk-drag-placeholder {
                opacity: 0;
            }

            .cdk-drag-animating {
                transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
            }

            .imageList.cdk-drop-list-dragging
                .imagePreview:not(.cdk-drag-placeholder) {
                transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
            }
        `,
    ],
})
export class ImageUploadComponent {
    selectedFiles: File[] = [];
    filePreviews: string[] = [];
    isDragOver: boolean = false;

    draggingIndex: number | null = null;
    hoveredIndex: number | null = null;

    constructor(private http: HttpClient) {}

    onFileChanges(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length) {
            this.selectedFiles.push(...Array.from(target.files));
            this.generatePreviews();
            console.log(this.selectedFiles);
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;
        if (event.dataTransfer && event.dataTransfer.files.length) {
            this.selectedFiles.push(...Array.from(event.dataTransfer.files));
            this.generatePreviews();
            console.log(this.selectedFiles);
            event.dataTransfer.clearData();
        }
    }

    private generatePreviews(): void {
        this.filePreviews = [];
        for (const file of this.selectedFiles) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.filePreviews.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.generatePreviews();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            this.filePreviews,
            event.previousIndex,
            event.currentIndex
        );
        moveItemInArray(
            this.selectedFiles,
            event.previousIndex,
            event.currentIndex
        );
    }
}
