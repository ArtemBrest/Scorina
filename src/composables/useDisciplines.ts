import * as Api from '~/api/disciplines';
import type {Discipline, DisciplineResponse} from '~/api/disciplines/types';

export const useDisciplines = () => {
    const disciplines = ref<DisciplineResponse[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchDisciplines = async () => {
        isLoading.value = true;
        try {
            const {data, error: fetchError} = await Api.getDisciplines();

            if (fetchError) {
                error.value = fetchError.msg;
            } else {
                disciplines.value = data || [];
            }
        } catch (err) {
            error.value = 'Failed to fetch disciplines';
        } finally {
            isLoading.value = false;
        }
    };

    const addDiscipline = async (newDiscipline: Discipline) => {
        isLoading.value = true;
        try {
            await Api.addDiscipline(newDiscipline);
            await fetchDisciplines();
        } catch (err) {
            error.value = 'Failed to add discipline';
        } finally {
            isLoading.value = false;
        }
    };

    const updateDiscipline = async (updatedDiscipline: DisciplineResponse) => {
        isLoading.value = true;
        try {
            await Api.updateDiscipline(updatedDiscipline); // Теперь передаем полный объект
            await fetchDisciplines();
        } catch (err) {
            error.value = 'Failed to update discipline';
        } finally {
            isLoading.value = false;
        }
    };

    const deleteDiscipline = async (id: number) => {
        isLoading.value = true;
        try {
            await Api.deleteDiscipline(id); // Передаем id в тело запроса через composable
            await fetchDisciplines();
        } catch (err) {
            error.value = 'Failed to delete discipline';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        disciplines,
        isLoading,
        error,
        fetchDisciplines,
        addDiscipline,
        updateDiscipline,
        deleteDiscipline,
    };
};
