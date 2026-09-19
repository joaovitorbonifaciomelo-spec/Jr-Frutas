import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade do site ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white text-black">
        <div className="container-site max-w-[820px] py-14 sm:py-20">
          <p className="eyebrow text-black/55">Legal</p>
          <h1 className="h-section mt-3">Política de Privacidade</h1>
          {/* PLACEHOLDER: texto genérico — revisar com o cliente / jurídico antes da publicação */}
          <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-black/75" data-pending="">
            <p>
              A {site.name} respeita a sua privacidade. Este site coleta apenas as informações que você fornece
              voluntariamente pelo formulário de cotação (nome, WhatsApp, empresa, cidade/estado, produto de interesse e
              mensagem), que são encaminhadas diretamente para o WhatsApp da nossa equipe comercial com a finalidade única
              de responder à sua solicitação.
            </p>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing. Os dados podem ser
              armazenados nos canais de atendimento da empresa pelo período necessário ao relacionamento comercial.
            </p>
            <p>
              Você pode solicitar a atualização ou exclusão dos seus dados a qualquer momento entrando em contato pelos
              canais informados no rodapé do site, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
            <p>Esta política pode ser atualizada periodicamente. Última revisão: {new Date().getFullYear()}.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
