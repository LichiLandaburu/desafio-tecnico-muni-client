import { create } from "zustand";
import { CreateProcedure, Procedure } from "../interfaces/procedure.interface";

interface State {
  procedures: Procedure[] | null;
  documentUrl: { url: string, name: string } | null;

  createProcedure: (data: CreateProcedure) => Promise<Procedure>;
  getProcedures: () => Promise<void>;
  updateProcedure: (id: string, data: Partial<Procedure>, token: string) => Promise<void>;
  changeStatus: (id: string, status: string, token: string) => Promise<void>;
  uploadDocument: (id: string, token: string, file: File) => Promise<void>;
  downloadDocument: (id: string, token: string) => Promise<void>;
}

export const useProcedureStore = create<State>((set, get) => ({
  procedures: null,
  documentUrl: null,

  createProcedure: async (data: CreateProcedure): Promise<Procedure> => {
    try {
      const res = await fetch("http://localhost:4000/api/procedures/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Ocurrio un error inesperado.");
      }

      const { procedure } = await res.json();

      await get().getProcedures();

      return procedure;
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  },

  getProcedures: async () => {
    try {
      const res = await fetch("http://localhost:4000/api/procedures", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const { procedures } = await res.json();

      set({ procedures });
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  },

  updateProcedure: async (procedureId: string, data: Partial<Procedure>, token: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/procedures/${procedureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      await get().getProcedures();
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  },

  changeStatus: async (procedureId: string, status: string, token: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/procedures/${procedureId}/change-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      await get().getProcedures();
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  },

  uploadDocument: async (procedureId: string, token: string, file: File) => {
    const formData = new FormData();
    formData.append("document", file); 

    try {
      const res = await fetch(`http://localhost:4000/api/procedures/${procedureId}/upload-document`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error en la subida del documento");
      }

      console.log("Documento subido con éxito");
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  },

  downloadDocument: async (procedureId: string, token: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/procedures/${procedureId}/download-document`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const contentDisposition = res.headers.get("Content-Disposition");
      let filename = "documento.pdf";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      set({ documentUrl: { url, name: filename } });
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      else {
        throw new Error("Ocurrio un error inesperado.");
      }
    }
  }

}));