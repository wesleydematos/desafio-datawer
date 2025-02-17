export interface EditProfessionalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedQualifications: string[]) => void;
  isLoading?: boolean;
  professionalName?: string;
  currentQualifications?: string[];
}
