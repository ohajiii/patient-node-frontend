export interface CaseResponseDto {
    id: number;
    patientId: number;
    intakeFormId: number;
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
    notes?: string;
    createdAt: string;
    updatedAt: string;

}

export interface CaseStatusUpdateRequestDto {
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}

export interface CaseNotesUpdateRequestDto {
    notes: string;
}