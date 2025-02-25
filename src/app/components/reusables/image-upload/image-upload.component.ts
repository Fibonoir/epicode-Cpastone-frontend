import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DragStateService } from '../../../services/drag-state.service';

@Component({
    selector: 'app-image-upload',
    imports: [CommonModule, DragDropModule],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
    selectedFiles: File[] = [];
    filePreviews: string[] = [];
    isDragOver: boolean = false;
    draggingIndex: number | null = null;
    hoveredIndex: number | null = null;

    @Output() photosChange = new EventEmitter<string[]>();
    @Output() filesChange = new EventEmitter<File[]>();


    constructor(private dragStateService: DragStateService) {}



    onFileChanges(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length) {
            this.selectedFiles.push(...Array.from(target.files));
            this.filePreviews = [];
            this.generatePreviews();
            this.filesChange.emit(this.selectedFiles);
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
            this.filePreviews = [];
            this.generatePreviews();

            this.filesChange.emit(this.selectedFiles);
            event.dataTransfer.clearData();
        }
    }

    private generatePreviews(): void {
        this.filePreviews = [];

        let processed = 0;
        for (const file of this.selectedFiles) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.filePreviews.push(e.target.result);
                processed++;

                if (processed === this.selectedFiles.length) {
                    this.photosChange.emit(this.filePreviews);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.filePreviews.splice(index, 1);

        this.photosChange.emit(this.filePreviews);
        this.filesChange.emit(this.selectedFiles);
    }

    onDragStarted() {
        this.dragStateService.setGrabbing(true)
    }

    onDragEnded() {
        this.dragStateService.setGrabbing(false)
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

        this.filesChange.emit(this.selectedFiles);
        this.photosChange.emit(this.filePreviews);
    }
}
