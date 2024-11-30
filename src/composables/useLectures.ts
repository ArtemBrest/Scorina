import * as Api from '~/api/lectures';
import type {Lecture, LectureResponse} from '~/api/lectures/types';

export const useLectures = () => {
    const lectures = ref<LectureResponse[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchLecturesByModule = async (moduleId: number) => {
        isLoading.value = true;
        try {
            const {data, error: fetchError} = await Api.getLecturesByModule(moduleId);

            if (fetchError) {
                error.value = fetchError.msg;
            } else {
                lectures.value = data || [];
            }
        } catch {
            error.value = 'Failed to fetch lectures';
        } finally {
            isLoading.value = false;
        }
    };

    const addLecture = async (newLecture: Lecture) => {
        isLoading.value = true;
        try {
            await Api.addLecture(newLecture);
            await fetchLecturesByModule(newLecture.module_id); // Обновляем список лекций для модуля
        } catch {
            error.value = 'Failed to add lecture';
        } finally {
            isLoading.value = false;
        }
    };

    const updateLecture = async (updatedLecture: Lecture) => {
        isLoading.value = true;
        try {
            await Api.updateLecture(updatedLecture);
            await fetchLecturesByModule(updatedLecture.module_id);
        } catch {
            error.value = 'Failed to update lecture';
        } finally {
            isLoading.value = false;
        }
    };

    const deleteLecture = async (lectureId: number, moduleId: number) => {
        isLoading.value = true;
        try {
            await Api.deleteLecture(lectureId);
            await fetchLecturesByModule(moduleId);
        } catch {
            error.value = 'Failed to delete lecture';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        lectures,
        isLoading,
        error,
        fetchLecturesByModule,
        addLecture,
        updateLecture,
        deleteLecture,
    };
};
