// Importa o hook useState do React
import { useState } from 'react'
// Importa o componente Logo
import Logo from './components/logo'
// Importa o componente Title
import Title from './components/title'
// Importa o arquivo de estilos
import '/src/app.css'

// Define o componente App
function App() {

	// Define o estado para mostrar ou esconder a senha
	const [mostraSenha, setMostraSenha] = useState(false);
	// Define o estado para o progresso
	const [progresso, setProgresso] = useState(0);
	// Define o estado para verificar se os campos estão preenchidos
	const [camposPreenchidos, setCamposPreenchidos] = useState({
		nome: '',
		telefone: false,
		email: '',
		senha: false,
	});
	// Define o estado para verificar se os termos foram aceitos
	const [aceitaTermos, setAceitaTermos] = useState(false); // Estado para rastrear se os termos foram aceitos
	// Define o estado para a mensagem de sucesso
	const [sucesso, setSucesso] = useState(false); // Estado para rastrear a mensagem de sucesso
	// Define o estado para a mensagem personalizada após clicar no botão
	const [mensagemConta, setMensagemConta] = useState(''); // Estado para a mensagem personalizada

	// Função para alternar a visibilidade da senha
	function handleMostraSenha() {
		setMostraSenha(!mostraSenha);
	}

	// Função para lidar com a mudança nos campos de entrada
	function handleChange(event: any) {
		const { id, value } = event.target;

		// Atualiza se o campo está preenchido ou não
		setCamposPreenchidos(prev => {
			return { ...prev, [id]: value }; // Armazena o valor do campo
		});

		// Atualiza o progresso baseado nos campos preenchidos
		const camposPreenchidosCount = Object.values({
			...camposPreenchidos,
			[id]: value.length > 0
		}).filter(Boolean).length;
		const novoProgresso = camposPreenchidosCount * 25; // Cada campo preenchido aumenta 25%
		setProgresso(novoProgresso);

		// Define a mensagem de sucesso quando o progresso atinge 100%
		if (novoProgresso === 100) {
			setSucesso(true);
		} else {
			setSucesso(false);
		}
	}

	// Função para lidar com a mudança no checkbox de aceitação dos termos
	function handleAceitaTermosChange(event: any) {
		setAceitaTermos(event.target.checked); // Atualiza o estado com base no checkbox
	}

	// Função para lidar com o clique no botão "Abra sua conta"
	function handleAbrirConta() {
		if (aceitaTermos) {
			setMensagemConta(`Obrigado ${camposPreenchidos.nome}, por abrir sua conta! Você receberá no email: ${camposPreenchidos.email}, detalhes sobre o recebimento do cartão.`); // Define a mensagem personalizada
		}
	}

	// Retorna o JSX do componente
	return (
		<main className="flex">

			<aside className="flex flex-column">
				<div className="flex flex-column">
					<Logo />
					<Title />
					<small
					>&copy; Criado por Jose Rodrigo e Samuel Victor, Matrícula:
						37022019 , 37016870</small>
				</div>

			</aside>

			<div className="flex flex-column">

				<div className="htmlFormulario flex flex-column">
					<div className="progresso">
						<label className={sucesso ? 'sucesso' : ''}>{sucesso ? 'Sucesso!' : 'Preencha os campos'}</label>
						<progress max="100" value={progresso}></progress>
					</div>

					<div className="flex flex-column">
						<label htmlFor="nome">Digite seu nome</label>
						<input type="text" id="nome" onChange={handleChange} />
					</div>

					<div className="flex flex-column">
						<label htmlFor="telefone">Digite seu telefone</label>
						<input type="text" id="telefone" onChange={handleChange} />
					</div>

					<div className="flex flex-column">
						<label htmlFor="email">Digite seu e-mail</label>
						<input type="text" id="email" onChange={handleChange} />
					</div>

					<div className="flex flex-column">
						<label htmlFor="senha">Digite sua senha</label>
						<input type={mostraSenha ? 'text' : 'password'} id="senha" onChange={handleChange} />
						<button className="mostra-senha" onClick={handleMostraSenha}>Exibir senha</button>
					</div>

					<div className="flex termos">
						<input
							type="checkbox"
							name="aceita-termos"
							id="aceita-termos"
							onChange={handleAceitaTermosChange} // Lida com a mudança do checkbox
						/>
						<label htmlFor="aceita-termos">
							Eu li, estou ciente das condições de tratamento dos
							meus dados pessoais e dou meu consentimento, quando
							aplicável, conforme descrito nesta
						</label>
					</div>

					<div className="flex">
						<button className="botao" disabled={!aceitaTermos} onClick={handleAbrirConta}> {/* Desabilita o botão se os termos não forem aceitos */}
							{aceitaTermos ? 'Abra sua conta' : 'Aceite os termos'} {/* Altera o texto do botão com base na aceitação dos termos */}
						</button>
					</div>

					{/* Exibe a mensagem personalizada abaixo do botão */}
					{mensagemConta && <div className="mensagem-conta">{mensagemConta}</div>}

				</div>
			</div>
		</main>
	)
}

// Exporta o componente App
export default App
