import { NFe, NFeData } from '../src/core/nfe/domain/entities/nfe-emitir.entity';
import { DomainError } from '../src/core/nfe/domain/errors/domain.error';

describe('NFe Entity', () => {
  const mockNFeData = {
    ide: {
      cUF: 35,
      mod: 55,
      serie: 1,
      nNF: 1,
      tpEmis: 1,
      dhEmi: new Date().toISOString(),
      toJSON: () => ({})
    },
    emit: {
      CNPJ: '12345678901234',
      toJSON: () => ({})
    },
    det: [{
      imposto: {
        ICMS: {
          ICMS10: {
            pFCPST: 2.00,
            vBCST: 100.00,
            vICMSST: 18.00
          }
        }
      },
      toJSON: () => ({})
    }],
    total: {
      ICMSTot: {
        vBCST: 100.00,
        vST: 18.00,
        vNF: 1000.00,
        calcularVNF: () => 1000.00,
        toJSON: () => ({})
      },
      toJSON: () => ({})
    },
    transp: {
      toJSON: () => ({})
    },
    pag: {
      toJSON: () => ({})
    }
  };

  it('deve criar uma NFe válida com chave de acesso correta', () => {
    const nfe = new NFe(mockNFeData as unknown as NFeData);
    expect(nfe.toJSON().nfeChaveAcesso).toHaveLength(44);
    expect(nfe.toJSON().nfeDV).toHaveLength(1);
  });

  it('deve validar totais de ICMS ST corretamente', () => {
    const nfe = new NFe(mockNFeData as unknown as NFeData);
    expect(() => nfe.validateTotalsAndPercents()).not.toThrow();
  });

  it('deve auto-corrigir e gerar avisos quando necessário', () => {
    const nfe = new NFe(mockNFeData as unknown as NFeData);
    const warnings = nfe.autoCorrectAndWarn();
    expect(Array.isArray(warnings)).toBe(true);
  });

  it('deve lançar erro para chave de acesso inválida', () => {
    const invalidData = {
      ...mockNFeData,
      emit: {
        ...mockNFeData.emit,
        CNPJ: '123' // CNPJ inválido
      }
    };

    expect(() => new NFe(invalidData as unknown as NFeData)).toThrow(DomainError);
  });

  it('deve gerar CNF com 8 dígitos', () => {
    const nfe = new NFe(mockNFeData as unknown as NFeData);
    expect(nfe.toJSON().nfeCNF).toMatch(/^\d{8}$/);
  });

  it('deve limpar objetos vazios ao converter para JSON', () => {
    const nfe = new NFe(mockNFeData as unknown as NFeData);
    const json = nfe.toJSON();
    expect(json.NFe).not.toHaveProperty('avulsa');
    expect(json.NFe).not.toHaveProperty('dest');
  });
});