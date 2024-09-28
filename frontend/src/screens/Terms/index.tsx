import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { styles } from './styles';

export default function TermsOfUse() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Termos de Uso</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
                <Text style={styles.title}>Termos e Condições de Uso do Aplicativo Dnutri</Text>

                <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
                <Text style={styles.text}>
                    Ao baixar, acessar ou usar o aplicativo DNutri, você concorda com os presentes Termos de Uso. Caso não concorde com os termos estabelecidos, por favor, não utilize o aplicativo.
                </Text>

                <Text style={styles.sectionTitle}>2. Descrição do Serviço</Text>
                <Text style={styles.text}>
                    O DNutri é um aplicativo voltado para o controle de calorias e monitoramento nutricional, permitindo que os usuários registrem suas refeições, acompanhem suas metas nutricionais e obtenham informações personalizadas sobre sua dieta.
                </Text>

                <Text style={styles.sectionTitle}>3. Cadastro e Responsabilidades do Usuário</Text>
                <Text style={styles.text}>
                    Para utilizar o aplicativo, o usuário deve criar uma conta, fornecendo informações precisas e completas. O usuário é o único responsável pela segurança de suas credenciais de login e pelo uso da sua conta.
                </Text>

                <Text style={styles.sectionTitle}>4. Uso Permitido</Text>
                <Text style={styles.text}>
                    O uso do DNutri deve estar de acordo com as leis aplicáveis e os presentes Termos de Uso. O usuário concorda em utilizar o aplicativo apenas para fins pessoais, sendo proibida sua utilização para qualquer outro fim comercial, sem prévia autorização da empresa.
                </Text>

                <Text style={styles.sectionTitle}>5. Dados Pessoais e Privacidade</Text>
                <Text style={styles.text}>
                    A coleta, uso e armazenamento de dados pessoais seguem as diretrizes da Lei Geral de Proteção de Dados (LGPD). Informações sobre como tratamos seus dados podem ser encontradas em nossa Política de Privacidade.
                </Text>

                <Text style={styles.sectionTitle}>6. Propriedade Intelectual</Text>
                <Text style={styles.text}>
                    Todo o conteúdo, incluindo textos, gráficos, logotipos, ícones e software presente no DNutri é de propriedade exclusiva da empresa, sendo protegido por leis de propriedade intelectual. O uso não autorizado de qualquer conteúdo pode resultar em penalidades legais.
                </Text>

                <Text style={styles.sectionTitle}>7. Limitação de Responsabilidade</Text>
                <Text style={styles.text}>
                    O DNutri não oferece garantias quanto à precisão ou completude das informações nutricionais fornecidas, e o uso das informações fornecidas é de total responsabilidade do usuário. O aplicativo não substitui orientação médica ou nutricional.
                </Text>

                <Text style={styles.sectionTitle}>8. Alterações nos Termos de Uso</Text>
                <Text style={styles.text}>
                    Reservamo-nos o direito de alterar ou atualizar os Termos de Uso a qualquer momento. Caso ocorram mudanças significativas, os usuários serão notificados por e-mail ou pelo próprio aplicativo.
                </Text>

                <Text style={styles.sectionTitle}>9. Rescisão</Text>
                <Text style={styles.text}>
                    Podemos suspender ou encerrar o acesso ao aplicativo a qualquer momento, sem aviso prévio, caso haja violação dos Termos de Uso.
                </Text>

                <Text style={styles.sectionTitle}>10. Lei Aplicável</Text>
                <Text style={styles.text}>
                    Os presentes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da Comarca da sede da empresa.
                </Text>

                <Text style={styles.sectionTitle}>11. Contato</Text>
                <Text style={styles.text}>
                    Caso tenha dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail suporte@dnutri.com.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
