
class Requests::Filter < BaseService
    attr_accessor :scope, :params
  
    def initialize(scope, params)
      @scope = scope
      @params = params
    end
  
    def call
      filter_by_tags()
    end
  
    private
    def filter_by_tags()
      return @scope if params[:tags].nil?
        scope_filtered = @scope
        scope_filtered.joins(:tags)
                   .where(tags: { title: params[:tags] })
                   .distinct
    end
  end
  