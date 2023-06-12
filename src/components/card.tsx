import { TaskProps, convertStatusToString } from "@/models/Task";
import { deleteTask, archiveTask } from "@/service/TaskService";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

export function Card({ task, style }: Task) {
  const router = useRouter();

  const limiterDescription = (description: string) => {
    const limit = 100;
    if (description.length > limit) {
      return description.substring(0, limit) + "...";
    }
    return description;
  };

  const remove = (id: string) => {
    deleteTask(id);
    router.push('/task').catch(() => {});
  };

  const archive = (id: string) => {
    archiveTask(id);
    router.push('/task').catch(() => {});
  };

  return (
    <div className="col card m-2" style={style}>
      <div className="card-header">
        <h2 className="card-title">{task.title}</h2>
        <br />
        <span className="bg-info-subtle">
          {convertStatusToString(task.status)}
        </span>
      </div>
      <div className="card-body">
        <p className="text">{limiterDescription(task.description)}</p>
      </div>
      <div className="card-footer text-center">
        <Link 
          className="btn btn-primary m-1" 
          href={`/task/${task.id}`}
        >
          Ver
        </Link>
        <Link
          href={"/task"}
          className="btn btn-danger m-1"
          onClick={() => remove(task.id)}
        >
          Excluir
        </Link>
        <Link 
          className="btn btn-secondary m-1" 
          href={`/task/form/${task.id}`}
        >
          Editar
        </Link>
        <Link
          className="btn btn-warning m-1"
          href={"/task"}
          onClick={() => archive(task.id)}
        >
          Arquivar
        </Link>
      </div>
    </div>
  );
}

interface Task {
  task: TaskProps,
  style?: CSSProperties
}