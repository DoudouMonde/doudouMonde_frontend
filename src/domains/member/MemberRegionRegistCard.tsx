export const MemberRegionRegistCard = () => {
  return (
    <FormCard title="아이 정보" subtitle="아이의 기본 정보를 입력해주세요.">
      <div className="flex flex-col gap-2">
        <FormInput
          title="이름"
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 정불명"
        />
      </div>
      <BirthdateSelect value={birth} onChange={setBirth} />
      <GenderSelect value={gender} onChange={setGender} />
    </FormCard>
  );
};
