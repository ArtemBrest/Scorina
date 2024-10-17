import * as Api from '~/api/modules';
import type {Module, ModuleResponse} from '~/api/modules/types';

export const useModules = () => {
    const modules = ref<ModuleResponse[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchModulesByDiscipline = async (disciplineId: number) => {
        isLoading.value = true;
        try {
            const {data, error: fetchError} = await Api.getModulesByDiscipline(disciplineId);

            if (fetchError) {
                error.value = fetchError.msg;
            } else {
                modules.value = data || [];
            }
        } catch (err) {
            error.value = 'Failed to fetch modules';
        } finally {
            isLoading.value = false;
        }
    };

    const addModule = async (newModule: Module) => {
        isLoading.value = true;
        try {
            await Api.addModule(newModule);
            await fetchModulesByDiscipline(newModule.discipline_id);
        } catch (err) {
            error.value = 'Failed to add module';
        } finally {
            isLoading.value = false;
        }
    };

    const updateModule = async (updatedModule: Module) => {
        isLoading.value = true;
        try {
            await Api.updateModule(updatedModule);
            await fetchModulesByDiscipline(updatedModule.discipline_id);
        } catch (err) {
            error.value = 'Failed to update module';
        } finally {
            isLoading.value = false;
        }
    };

    const deleteModule = async (id: number, disciplineId: number) => {
        isLoading.value = true;
        try {
            await Api.deleteModule(id);
            await fetchModulesByDiscipline(disciplineId);
        } catch (err) {
            error.value = 'Failed to delete module';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        modules,
        isLoading,
        error,
        fetchModulesByDiscipline,
        addModule,
        updateModule,
        deleteModule,
    };
};
