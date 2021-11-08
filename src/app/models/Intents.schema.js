export const Intents = [
  'cpf',
  'dataNasc',
  'nome',
  'email',
  'telefone',
  'cep',
  'completed',
]

export const Conversations = {
  store: {
    created: [
      'Vamos nos conhecer melhor?',
      'Meu nome completo é Manaus Iteligência Artificial, mas pode me chamar de MIA 🤗',
      'Qual é o seu? 😊',
    ],

    nome: ['Prazer em te conhecer 🤗', 'Qual é o seu email? 💌'],

    email: [
      'Obrigada 😄',
      'Me diz, qual é o seu Whatsapp? 📱',
      '(apenas números)',
    ],

    telefone: [
      'Que legal, vou poder te enviar mensagens 🤭',
      'Agora me diz o CEP da sua casa 🏡',
      '(apenas números)',
    ],

    cep: ['Aêêêêê 🎉', 'Seu cadastro foi finalizado 🥳'],
  },

  errors: {
    registeredCpf: ['Ops...', 'Esse CPF já foi cadastrado 😣'],

    notRegisteredCpf: ['Ops...', 'Parece que ainda não fiz seu cadastro 🥺'],

    incorrectData: [
      'Ops...',
      'Esses dados estão incorretos 😣',
      'Mas tenta de novo, ok? 🥺',
    ],

    nome: [
      'Ei, preciso do seu nome completo 🤭',
      'Informa de novo, por favor...',
    ],

    email: [
      'Ei, esse email é inválido 🥺',
      'Um email válido é como esse aqui, oh',
      'email@exemplo.com ✅',
      'Tenta de novo, por favor 😉',
    ],

    telefone: [
      'Hmmm, parece que esse número é inválido 😥',
      'Eu espero um número assim: 92912345678',
      'Verifica se tá tudo certinho e manda de novo, por favor 🙃',
    ],

    cep: [
      'Poxa, esse CEP não está correto 😬',
      'Você errou algum número?',
      'Tenta de novo, vai 🤗',
    ],
  },
}
