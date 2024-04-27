
class Requests::Filter < BaseService
    attr_accessor :scope, :params
  
    def initialize(scope, params)
      @scope = scope
      @params = params
    end
  
    def call
      filter_by_tags()
    end

    def select_users_requests 
      @scope = @scope.where(user_id: params[:id])
    end
  
    private
    def filter_by_tags()
      select_users_requests() if params[:id]

      return @scope if params[:tags].nil? || params[:tags].empty?
        scope_filtered = @scope
        scope_filtered.joins(:tags)
                   .where(tags: { name: params[:tags] })
                   .distinct
    end
  end
  