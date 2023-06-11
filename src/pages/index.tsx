import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <section className="container">
            <div className="row" style={{minHeight: "91.5vh"}}>
                <div 
                    className="d-flex col align-items-center"
                >
                    <div>
                        <h1>Bem vindo ao Taskin</h1>
                        <p className="text">
                            Seu Gerenciador de tarefas mais fácil do que imagina
                        </p>
                        <Link 
                            className="btn btn-primary" 
                            href="/task"
                        >Iniciar</Link>
                    </div>
                </div>
                <div className="col align-items-center" style={{position: 'relative', minHeight: '100%'}}>
                    <Image
                        className="col-md-2"
                        alt="imagem-da-web" 
                        src={"/organize-tasks.svg"}
                        fill
                    />
                </div>
            </div>
        </section>
        
    )
}