import { computed, type Ref } from 'vue';

export const usePasswordValidation = (password: Ref<string>) => {
  const hasMinLength = computed(() => password.value.length >= 8);
  const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
  const hasNumber = computed(() => /[0-9]/.test(password.value));
  const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value));

  const strengthScore = computed(() => {
    let score = 0;
    if (hasMinLength.value) score += 1;
    if (hasUpperCase.value) score += 1;
    if (hasNumber.value) score += 1;
    if (hasSpecialChar.value) score += 1;
    return score;
  });

  const strengthLabel = computed(() => {
    if (password.value.length === 0) return '';
    if (strengthScore.value <= 1) return 'ضعيفة';
    if (strengthScore.value === 2 || strengthScore.value === 3) return 'متوسطة';
    return 'قوية';
  });
  
  const strengthColor = computed(() => {
    if (password.value.length === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (strengthScore.value <= 1) return 'bg-red-500';
    if (strengthScore.value === 2 || strengthScore.value === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  });

  return {
    hasMinLength,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    strengthScore,
    strengthLabel,
    strengthColor
  };
};
