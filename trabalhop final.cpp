#include <iostream>
#include <queue>
using namespace std;

struct Cliente {
    int senha;
    char prioridade;
    int hora;
    int minuto;
};

int main() {
    queue<Cliente> v, a, d, b;
    int atendidos = 0, picoLotacao = 0, esperaMax = 0;
    int horaAtendimento = 0, minutoAtendimento = 0;
    char opcao;

    do {
        cout << "\nC. Chegada de paciente" << endl;
        cout << "A. Atendimento" << endl;
        cout << "D. Informacoes sobre as filas" << endl;
        cout << "Q. Encerrar" << endl;
        cout << "Escolha uma opcao: ";
        cin >> opcao;
        switch (opcao) {
            case 'C': {
                Cliente cliente;
                cout << "Senha: ";
                cin >> cliente.senha;
                cout << "Prioridade (V, A, D, B): ";
                cin >> cliente.prioridade;
                cout << "Hora e minuto da chegada: ";
                cin >> cliente.hora >> cliente.minuto;

                if (cliente.prioridade == 'V') 
                    v.push(cliente);
                else if (cliente.prioridade == 'A') 
                    a.push(cliente);
                else if (cliente.prioridade == 'D') 
                    d.push(cliente);
                else if (cliente.prioridade == 'B') 
                    b.push(cliente);

                int total = v.size() + a.size() + d.size() + b.size();
                if (total > picoLotacao) 
                    picoLotacao = total;
                break;
            }

            case 'A': {
                cout << "Hora e minuto do atendimento: ";
                cin >> horaAtendimento >> minutoAtendimento;
                int totalMinAtendimento = horaAtendimento * 60 + minutoAtendimento;

                bool disponivel = true;
                Cliente aux;

                if (!v.empty()) {
                    aux = v.front();
                    v.pop(); 
                }
                else if (!a.empty()){  
                    aux = a.front(); 
                    a.pop(); 
                }
                else if (!d.empty()){ 
                    aux = d.front(); 
                    d.pop();
                } 
                else if (!b.empty()){  
                    aux = b.front(); 
                    b.pop(); 
                }
                else disponivel = false;

                if (disponivel) {
                    atendidos++;
                    int espera = totalMinAtendimento - (aux.hora * 60 + aux.minuto);
                    if (espera > esperaMax) 
                        esperaMax = espera;
                    cout << "Paciente atendido: " << aux.senha << " - " << aux.prioridade << endl;
                } else {
                    cout << "Sem pacientes aguardando." << endl;
                }
                break;
            }

            case 'D': {
                cout << horaAtendimento << ":" << minutoAtendimento << "  ";
                if (v.empty() && a.empty() && d.empty() && b.empty())
                    cout << "Sem pacientes aguardando" << endl;
                else {
                    cout << "V:" << v.size()
                         << " A:" << a.size()
                         << " D:" << d.size()
                         << " B:" << b.size() << "    "
                         << "Atendidos:" << atendidos << endl;
                }
                break;
            }

            case 'Q': {
                cout << "\n--- RELATORIO FINAL ---" << endl;
                cout << "Total atendidos: " << atendidos << endl;
                cout << "Por prioridade: "
                     << "V=" << v.size() 
                     << " A=" << a.size()
                     << " D=" << d.size() 
                     << " B=" << b.size() << endl;
                cout << "Pico de lotacao: " << picoLotacao << endl;
                cout << "Espera maxima: " << esperaMax << " min" << endl;
                cout << "Encerrando..." << endl;
                break;
            }

            default:
                cout << "Opcao invalida. Tente novamente.\n";
        }

    } while (opcao != 'Q');

    return 0;
}
