const messagesObj = {
    newInheritanceSuccess: {
            title: 'Herencia creada',
            text: "La herencia se ha creado correctamente",
            icon: "success"
    },
    newInheritanceWarning: {
        title: "Importante",
        text: "Esta herramienta está diseñada para ser utilizada por profesionales del derecho y la notaría. No sustituye el asesoramiento legal. Las recomendaciones son orientativas y deben ser validadas por un profesional.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#1b263b',
        cancelButtonColor: '#e32e36',
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar"
    },
    newInheritanceError: {
        title: 'Error',
        text: "Error creando herencia",
        icon: "error"
    },
    valorationAddedSuccess: {
        title: 'Valoracion añadida',
        text: "La Valoracion se ha añadido correctamente",
        icon: "success"
    },
    valorationAddedError: {
        title: 'Error',
        text: "Error añadiendo valoracion",
        icon: "error"
    },
    calculateSuccess: {
        title: 'Calculando',
        text: "La solución se esta calculando, puede tardar unos minutos...",
        icon: "success"
    },
    calculateError: {
        title: 'Error',
        text: "Error iniciando el cálculo, prueba mas tarde",
        icon: "error"
    },
    solutionNotFoundError: {
        title: 'Error',
        text: "La solución no ha sido calculada todavía",
        icon: "error"
    },
    emailVerifiedSuccess: {
        title: 'Email verificado',
        text: 'Ahora puedes acceder',
        icon: "success"
    },
    UserNotFoundException: {
        title: 'Email no encontrado',
        icon: "error"
    },
    networkError: {
        title: "Error de conexión",
        icon: "error"
    },
    sessionError: {
        title: "La sesión ha expirado",
        icon: "error"
    },
    accessDeniedError: {
        title: "Accesso denegado",
        icon: "error"
    },
    itemNotFoundError: {
        title: "Elemento no encontrado",
        icon: "error"
    },
    unexpectedError: {
        title: "Error insesperado, inténtalo más tarde",
        icon: "error"
    },
    deleteInheritanceConfirmation: {
        title: "¿Estás seguro?",
        text: "Una vez eliminada no podrá ser recuperada!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e32e36',
        cancelButtonColor: '#1b263b',
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    },
    deleteInheritanceSuccess: {
        title: "Herencia eliminada",
        icon: "success"
    },
    passwordUpdated: {
        title: "Constraseña actualizada",
        icon: "success"
    },
    passwordUpdatedError: {
        title: "Error actualizando constraseña",
        icon: "error"
    },
    
}
export default messagesObj;