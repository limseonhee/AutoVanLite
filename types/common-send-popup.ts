export interface CustomerData {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
    plateNo: string;
    lastVisit: string;
}

export interface PreviewContent {
    title: string;
    message: string;
    additionalInfo?: string[];
}

export interface CommonSendPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    description: string;
    totalTargets: number;
    expectedAmount?: number;
    targetButtonText?: string;
    onTargetView?: () => void;
    onPreview: () => void;
    onSend: () => void;
    isLoading?: boolean;
    previewContent?: PreviewContent;
    customerList?: CustomerData[];
}
