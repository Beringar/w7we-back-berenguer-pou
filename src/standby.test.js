describe("given an standby test", () => {
  describe("when there is no tests yet", () => {
    test("Then it should pass...", async () => {
      const textIndianaJonesIII = "Only the penitent man will pass...";
      const lineByHarrisonFordILike = "Only the penitent man will pass...";

      expect(textIndianaJonesIII).toBe(lineByHarrisonFordILike);
    });
  });
});
