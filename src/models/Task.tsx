export interface TaskProps {
    id: string;
    title: string;
    description: string;
    status: Status;
}

export enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ARCHIVED = "ARCHIVED",
}

export const convertStatusToString = (status: Status) => {
    const statusMap: { [key in Status]: string } = {
      [Status.NOT_STARTED]: "Não Iniciado",
      [Status.IN_PROGRESS]: "Em Progresso",
      [Status.COMPLETED]: "Finalizada",
      [Status.ARCHIVED]: "Arquivada",
    };

    return statusMap[status as keyof typeof Status];
};

  